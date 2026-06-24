import app from "./app";
import "dotenv/config";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 5000;

async function main() {
    try {
        await prisma.$connect();
        console.log("connected to DB successfully!");
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        })
    } catch (error) {
        console.log("Error starting server:", error);
        await prisma.$disconnect();
        process.exit(1);
    }
};


main();