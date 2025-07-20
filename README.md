# Whispering Maps - Children's Books

A Next.js website for Whispering Maps, featuring children's books and stories.

## Getting Started

First, install the dependencies:

```bash
yarn install
```

Then, create a `.env.local` file in the root directory with the following environment variables:

```bash
# SendGrid Configuration
SENDGRID_API_KEY=your_sendgrid_api_key_here

# Email Configuration
FROM_EMAIL=noreply@whisperingmaps.com
ADMIN_EMAIL=koshik.raj@gmail.com
```

**Note:** You'll need to:
1. Sign up for a SendGrid account at [sendgrid.com](https://sendgrid.com)
2. Create an API key in your SendGrid dashboard
3. Verify your sender email address in SendGrid
4. Replace `your_sendgrid_api_key_here` with your actual SendGrid API key

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Responsive design
- Hand-drawn illustrations
- Video content
- Book showcase
- Newsletter signup section

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- React 18

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout component
│   ├── page.tsx        # Main page component
│   └── globals.css     # Global styles
├── public/
│   └── assets/         # Static assets (images, videos)
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Build

To build the project for production:

```bash
yarn build
```

To start the production server:

```bash
yarn start
``` 