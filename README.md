# 🍳 Recipe Vault

A full-stack recipe manager built with Next.js, NestJS, and Firebase Firestore, organized as an Nx monorepo.

## Stack

- **Frontend**: Next.js 16 + TypeScript + Tailwind CSS + React Query
- **Backend**: NestJS + TypeScript
- **Database**: Firebase Firestore (NoSQL)
- **Monorepo**: Nx

## Architecture
recipe-vault/
├── backend/          # NestJS REST API (port 3333)
├── frontend/         # Next.js app (port 3000)
└── shared-types/     # Shared TypeScript interfaces

## Data Model

Ingredients are embedded directly inside the recipe document rather than stored in a separate collection. Since ingredients have no existence outside of a recipe
```json
{
  "id": "auto-generated",
  "title": "Pasta Carbonara",
  "difficulty": "Easy",
  "createdAt": "2026-04-13T10:00:00.000Z",
  "ingredients": [
    { "name": "Pasta", "quantity": "200g" },
    { "name": "Eggs", "quantity": "3" }
  ]
}
```

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/recipes` | Get all recipes |
| GET | `/recipes/:id` | Get a single recipe |
| POST | `/recipes` | Create a recipe |
| PUT | `/recipes/:id` | Update a recipe |
| DELETE | `/recipes/:id` | Delete a recipe |

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with Firestore enabled

### Firebase Setup for the database

1. Create a project on [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore in **test mode**
3. Go to **Project settings → Service accounts**
4. Click **Generate new private key** and download the JSON file
5. Save it as `backend/src/firebase-service-account.json`

> ⚠️ Never commit this file — it is already listed in `.gitignore`

### Installation
```bash
npm install
```

### Run the project

Open two terminals:
```bash
# Terminal 1 — start the backend (port 3333)
npx nx serve backend

# Terminal 2 — start the frontend (port 3000)
npx nx serve frontend
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Key Technical Decisions

**Embedded ingredients** — Ingredients are stored as an array inside the recipe document. In a NoSQL context, data that is always read together should be stored together.

**Shared types** — TypeScript interfaces (`Recipe`, `Ingredient`, `CreateRecipeDto`) are defined once in `shared-types/` and consumed by both the frontend and backend, ensuring consistency across the stack.

**React Query** — Used instead of manual `useEffect` + `useState` for data fetching. It handles caching, loading states, and automatic re-fetching after mutations.

**NestJS Dependency Injection** — The `FirebaseService` is injected into `RecipesService`, making the database layer easy to mock in unit tests.