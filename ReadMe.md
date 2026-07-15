# 📝 Prisma Press — Backend

**A Modular Blog API, Powered by Prisma**

A modular blog REST API built with Express, TypeScript, Prisma, and PostgreSQL. Features JWT auth, role-based access control, post management with search & pagination, comment moderation, and admin reporting.

🔗 **Live:** [prisma-press-five.vercel.app](https://prisma-press-five.vercel.app/)

---

## 📖 Overview

Prisma Press is a backend for a modern blogging platform where:

- **Admins** manage users, moderate content, and view platform-wide reports.
- **Authors** create, edit, and manage their own blog posts.
- **Readers** browse posts, search and filter content, and leave comments.

---

## 👥 Roles & Permissions

| Role       | Description                       | Key Permissions                                                   |
| ---------- | ---------------------------------- | -------------------------------------------------------------------- |
| **Reader** | Registered users who read content  | Browse posts, search/filter, comment, manage profile                 |
| **Author** | Users who publish blog content     | Create/edit/delete own posts, view own post analytics                |
| **Admin**  | Platform moderators                | Manage users, moderate comments, view reports, manage all posts      |

> 💡 **Note**: Users select their role during registration; admin roles are assigned separately.

---

## ✨ Features

### Public
- Browse all published posts
- Search posts by keyword, tag, or category
- Paginated post listings
- View individual post details and comments

### Reader
- Register / login
- Comment on posts
- Manage own profile
- Subscribe for premium content via Stripe

### Author
- Register / login as author
- Create, edit, and delete own posts
- View engagement on own posts (views, comments)

### Admin
- Manage all users (ban/unban, change roles)
- Moderate and remove comments
- Moderate and manage all posts
- View admin reports (post counts, user activity, comment stats)

---

## 🛠️ Tech Stack

| Layer         | Technology                          |
| -------------- | -------------------------------------- |
| Runtime         | Node.js                                |
| Language        | TypeScript                             |
| Framework       | Express 5                              |
| Database        | PostgreSQL                             |
| ORM             | Prisma                                 |
| Auth            | JWT (`jsonwebtoken`) + `bcryptjs`      |
| Payments        | Stripe (subscriptions + webhooks)      |
| Dev tooling     | `tsx` (dev server), `tsup` (build)     |
| Middleware      | `cors`, `cookie-parser`, `dotenv`      |

---

## 📁 Project Structure

```
Prisma-Press/
├── prisma/              # Prisma schema, migrations, and seed script
├── src/                 # Application source code
│   └── server.ts        # App entry point
├── .vscode/              # Editor settings
├── .env.example          # Sample environment variables
├── prisma.config.ts      # Prisma configuration
├── tsconfig.json         # TypeScript configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Stripe account (for subscription features)

### Installation

```bash
git clone https://github.com/Shashuvo/Prisma-Press.git
cd Prisma-Press
npm install
```

### Environment Variables

Create a `.env` file in the project root (see `.env.example` for reference):

```env
DATABASE_URL=postgresql://user:password@localhost:5432/prismapress
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
PORT=5000
```

### Database Setup

```bash
npx prisma migrate dev
```

### Run the Project

```bash
npm run dev              # development
npm run build            # production build
npm start                # start built app
npm run stripe:webhook   # forward Stripe webhooks locally
```

---

## 📡 API Endpoints

> ⚠️ **Note**: These endpoints reflect the project's core modules; exact routes may vary slightly in implementation.

### Authentication
| Method | Endpoint             | Description                          |
| ------ | --------------------- | ----------------------------------- |
| POST   | `/api/auth/register`  | Register a new user                  |
| POST   | `/api/auth/login`     | Login and receive a JWT              |
| GET    | `/api/auth/me`        | Get the current authenticated user   |

### Posts (Public)
| Method | Endpoint             | Description                                  |
| ------ | ----------------------- | ----------------------------------------------- |
| GET    | `/api/posts`            | Get all posts (search, filter, pagination)      |
| GET    | `/api/posts/:id`        | Get a single post with its comments             |

### Posts (Author)
| Method | Endpoint             | Description                       |
| ------ | ----------------------- | ------------------------------------ |
| POST   | `/api/posts`            | Create a new post                    |
| PUT    | `/api/posts/:id`        | Update own post                      |
| DELETE | `/api/posts/:id`        | Delete own post                      |

### Comments
| Method | Endpoint                  | Description                       |
| ------ | ---------------------------- | ------------------------------------ |
| POST   | `/api/comments`              | Add a comment to a post              |
| DELETE | `/api/comments/:id`          | Delete own comment                   |

### Subscriptions (Stripe)
| Method | Endpoint                        | Description                             |
| ------ | ---------------------------------- | ------------------------------------------- |
| POST   | `/api/subscription/checkout`       | Create a Stripe checkout session            |
| POST   | `/api/subscription/webhook`        | Stripe webhook for subscription events      |
| GET    | `/api/subscription/status`         | Get current user's subscription status      |

### Admin
| Method | Endpoint                  | Description                          |
| ------ | ---------------------------- | ---------------------------------------- |
| GET    | `/api/admin/users`           | Get all users                            |
| PATCH  | `/api/admin/users/:id`       | Update user status/role                  |
| DELETE | `/api/admin/comments/:id`    | Moderate/remove a comment                |
| GET    | `/api/admin/reports`         | Get platform-wide reporting data         |

---

## 🗄️ Database Schema (Overview)

- **Users** — authentication details and role (reader / author / admin)
- **Posts** — blog content, linked to an author
- **Comments** — reader comments, linked to posts and users
- **Categories/Tags** — used for post search & filtering
- **Subscriptions** — Stripe subscription records (status, plan, period)

---

## 🔄 Content Moderation Flow

```
POST CREATED → PUBLISHED → (reader) COMMENTS
                    │
                    ▼
            (admin) MODERATES / REMOVES
```

---

## 👤 Author

**MD. Shahariat Hossen**
GitHub: [@Shashuvo](https://github.com/Shashuvo)

---

## 📄 License

This project is licensed under the ISC License.