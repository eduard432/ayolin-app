# Ayolin

Ayolin is a no-code platform for creating, managing, and deploying highly customizable AI chatbots. Built with Next.js, it offers a seamless experience for integrating intelligent assistants into various channels like Telegram, with support for custom tools, file-based context, and subscription management via Stripe.

The platform provides a comprehensive user dashboard to configure chatbot personalities, manage integrations, view usage statistics, and test conversations in real-time.

## Features

- **No-Code Chatbot Builder**: Create and customize chatbots through an intuitive UI without writing any code.
- **Authentication**: Secure user access with credentials-based login, social sign-on (Google, GitHub), and Two-Factor Authentication (2FA).
- **Dashboard**: A central hub to manage your chatbots, view analytics, configure account settings, and handle payments.
- **Channel Integrations**: Connect your chatbots to external platforms. Currently supports Telegram, with webhooks for easy integration.
- **Custom Tools & Marketplace**: Extend chatbot capabilities by adding pre-built tools from the marketplace or creating your own custom functions.
- **File-based Context**: Upload documents to provide your chatbots with specific knowledge and context for their responses.
- **Real-time Chat Interface**: Test and interact with your chatbots through a streaming chat UI.
- **Subscription Management**: Integrated with Stripe for handling pro user subscriptions and payment management.

## Tech Stack

- **Framework**: Next.js (with App Router)
- **Language**: TypeScript
- **Database/ORM**: MongoDB with Prisma
- **Authentication**: NextAuth.js
- **UI**: Tailwind CSS, shadcn/ui, Radix UI, Framer Motion
- **AI**: Vercel AI SDK, OpenAI
- **Payments**: Stripe
- **File Storage**: Vercel Blob
- **Email**: Resend
- **State Management**: React Query (TanStack Query)
- **Validation**: Zod

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (v20.x or later)
- npm, yarn, or pnpm

### 1. Clone the Repository

```bash
git clone https://github.com/eduard432/ayolin-app.git
cd ayolin-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project and add the necessary environment variables. These are crucial for authentication, database connection, and third-party services.

```env
# Prisma/MongoDB
MONGODB_URI="your_mongodb_connection_string"

# NextAuth.js
AUTH_SECRET="your_strong_auth_secret"
AUTH_URL="http://localhost:3000"
AUTH_GITHUB_ID="your_github_oauth_app_id"
AUTH_GITHUB_SECRET="your_github_oauth_app_secret"
AUTH_GOOGLE_ID="your_google_oauth_client_id"
AUTH_GOOGLE_SECRET="your_google_oauth_client_secret"

# Stripe
STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"
STRIPE_PRO_MONTHLY_PRICE_ID="your_stripe_price_id"

# Resend (for emails)
RESEND_API_KEY="your_resend_api_key"

# Vercel Blob (for file storage)
BLOB_READ_WRITE_TOKEN="your_vercel_blob_token"
```

### 4. Generate Prisma Client

Generate the Prisma client to interact with your database based on the schema.

```bash
npx prisma generate
```

### 5. Run the Development Server

Start the application in development mode.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The repository is organized to separate concerns and facilitate scalability.

-   `app/`: The core application, structured using the Next.js App Router.
    -   `api/`: API routes for handling authentication, webhooks, and backend logic.
    -   `dashboard/`: Contains all pages and components for the user dashboard.
    -   `(components)/`: Landing page-specific components.
-   `actions/`: Next.js Server Actions for handling form submissions like login and registration.
-   `components/`: Shared UI components, including primitives from `shadcn/ui`.
-   `data/`: Data access layer, with functions for fetching and updating data on both the client and server.
-   `lib/`: Core utilities and helper functions for authentication (`auth.ts`), database (`db.ts`), AI (`ai.ts`), and more.
-   `prisma/`: The database schema definition (`schema.prisma`).
-   `schemas/`: Zod schemas for data validation across the application.
-   `ai_tools/`: Definitions for pre-built AI tools available in the marketplace.
