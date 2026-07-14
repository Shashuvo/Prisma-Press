import Stripe from "stripe";
import { SubscriptionStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";

// current period end time
const getPeriodEnd = (payload: Stripe.Subscription) => {
    const currentPeriodEndsMS = payload.items.data[0]?.current_period_end!;
    const currentPeriodEnd = new Date(currentPeriodEndsMS * 1000);
    return currentPeriodEnd;
}
// handle events
export const handleCheckoutCompleted = async (session: Stripe.Checkout.Session) => {
    const userId = session.metadata?.userId;
    const stripeCustomerId = session.customer as string;
    const stripeSubscriptionId = session.subscription as string;
    if (!userId || !stripeCustomerId || !stripeSubscriptionId) {
        console.log(`Webhook : Missing values for creating checkout.`);
        return;
    }
    const stripeSubscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);

    const currentPeriodEnd = getPeriodEnd(stripeSubscription);

    await prisma.subscription.upsert({
        where: {
            userId
        },
        create: {
            userId,
            stripeCustomerId,
            stripeSubscriptionId,
            currentPeriodEnd
        },
        update: {
            stripeCustomerId,
            stripeSubscriptionId,
            currentPeriodEnd
        }
    })
};
export const handleChangeSubscription = async (payload: Stripe.Subscription) => {
    const stripeSubscriptionId = payload.id;
    const status = (payload.status === "active" || payload.status === "trialing") ? SubscriptionStatus.ACTIVE :
        payload.status === "canceled" ? SubscriptionStatus.CANCELED : SubscriptionStatus.EXPIRED;
    const currentPeriodEnd = getPeriodEnd(payload);
    const isSubscriptionExists = await prisma.subscription.findUnique({
        where: {
            stripeSubscriptionId
        }
    })
    if (!isSubscriptionExists) {
        console.log(`Webhook : No subscriptions found for subscription Id: ${stripeSubscriptionId}`);
        return;
    }
    await prisma.subscription.update({
        where: {
            stripeSubscriptionId
        },
        data: {
            status,
            currentPeriodEnd
        }
    })
};