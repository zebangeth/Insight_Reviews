# Insight Reviews (Next.js)

This `web/` app reimplements the Streamlit-based Insight Reviews experience with a modern Next.js, Tailwind CSS, and shadcn/ui stack. It preserves the legacy workflows—multi-step review ingestion, focus/role prompt controls, pricing, and contact flows—while introducing a reusable design system and server-secured LLM calls.

## Prerequisites

- Node.js ≥ 20 and npm ≥ 10
- Environment variables
  - `OPENAI_API_KEY` (required for GPT-4o mini summaries)
  - `ANTHROPIC_API_KEY` (required for Claude models)
  - `NEXT_PUBLIC_CONTACT_EMAIL` (optional, renders the contact form endpoint)

Create a `.env.local` in `web/` with the API keys before running locally or deploying to Vercel.

```
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=...
NEXT_PUBLIC_CONTACT_EMAIL=team@example.com
```

## Local development

```bash
cd web
npm install
npm run dev
# visit http://localhost:3000
```

### Quality checks

```bash
npm run lint     # ESLint + TypeScript
npm run build    # Production build verification (no Turbopack)
```

Uploaded `.xlsx` files are parsed entirely in memory and never written to disk; only the prompt-ready text is sent to the AI providers.

## Project layout

- `src/app` – App Router pages and API routes (`/api/reviews/prepare`, `/api/analyze`)
- `src/components` – Layout chrome, shadcn-based UI primitives, and page modules
- `src/config` – Language-aware navigation, analysis options, and model registry
- `src/content` – Localised copy for each page
- `src/lib` – Excel parsing, prompt construction, and shared constants

## Deployment notes

Deploy to Vercel by importing the repository root and picking `web/` as the project directory. Add the environment variables above in the Vercel dashboard. The build command remains `npm run build` (Turbopack disabled); the output is a static/Edge-friendly Next.js app backed by serverless API routes.
