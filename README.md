# Prompt Engine Template Version

This version uses full base prompt templates instead of only short generated prompts.

## Workflow
1. The app stores a full master template per category.
2. Randomization picks values from the template.
3. The app builds a final generated prompt from that template.
4. It checks for duplicates before showing it.
5. You copy and use the prompt manually.
6. You save only the prompt you actually used.

## Setup
```bash
npm install
cp .env.example .env.local
npm run dev
```

Run `supabase/schema.sql` in your Supabase SQL Editor first.
