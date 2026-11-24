
# 🍽️ Recipe Book

A full-stack recipe management application built with Next.js, TypeScript, React, and PostgreSQL.

Recipe Book is a web application designed to organize and manage recipes through a modern, responsive interface. The project focuses on full-stack development, database integration, API development, and maintainable software architecture.

## 🚀 Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- DaisyUI
- TanStack Query
- React Hook Form

### Backend
- Next.js API Route Handlers
- Node.js
- REST API principles
- Zod for data validation

### Database & Authentication
- Neon PostgreSQL
- Neon Auth

### Development Tools
- Git & GitHub
- npm
- ESLint
- GitHub Copilot

## ✨ Features

- Recipe listing and management
- Recipe data stored in PostgreSQL
- API endpoint for retrieving recipes
- Database integration using Neon Serverless
- Type-safe development with TypeScript
- Form handling and validation
- User authentication integration (under development)

## 🏗️ Project Architecture

The application follows a modular full-stack architecture.

```text
recipy-book/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── recipes/
│   │   │       └── route.ts
│   │   ├── components/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   │
│   ├── data/
│   └── lib/
│       ├── db.ts
│       └── validations/
│
├── public/
├── .env.local
├── package.json
└── README.md
```

*Note: The structure is a simplified overview.*

## 🗄️ Database

The application uses Neon Serverless PostgreSQL.

The recipes table includes the following fields:

| Field | Description |
|---|---|
| id | Unique recipe identifier |
| title | Recipe name |
| description | Recipe description |
| ingredients | Recipe ingredients |
| duration | Preparation time |
| category | Recipe category |
| image | Optional recipe image |
| user_id | Associated user identifier |

## 🔌 API

### Recipes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/recipes` | Retrieve recipes |

Additional recipe management endpoints and functionality are part of the ongoing development.

## ⚙️ Getting Started

### Prerequisites

- Node.js
- npm
- Neon PostgreSQL account

### 1. Clone the repository

```bash
git clone https://github.com/konstantinos32/recipy-book.git
```

### 2. Navigate to the project

```bash
cd recipy-book
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root:

```env
DATABASE_URL=your_neon_database_connection_string
```

Use your own Neon database connection string. Never commit environment variables or secrets to GitHub.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Development

This project follows a feature-based Git workflow.

- `main` – Stable production branch
- `dev` – Development integration branch
- `feature/*` – Individual feature development
- Pull Requests are used to review and merge changes.

## 🎯 Project Goals

The main objectives of this project are to:

- Build a full-stack application using modern web technologies.
- Develop and integrate REST API endpoints.
- Work with relational databases and data modeling.
- Implement authentication and user-specific data access.
- Apply reusable components and modular architecture.
- Practice collaborative development using Git and GitHub.
- Improve software engineering and system design skills.

## 👨‍💻 Author

**Konstantinos Theodoropoulos**

- GitHub: [@konstantinos32](https://github.com/konstantinos32)
- Project: [Recipe Book](https://github.com/konstantinos32/recipy-book)
