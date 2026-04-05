create extension if not exists pgcrypto;

create table if not exists saved_prompts (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  subcategory text,
  payload jsonb not null,
  rendered_prompt text not null,
  fingerprint_hash text not null,
  created_at timestamptz not null default now()
);

create unique index if not exists saved_prompts_fingerprint_hash_uidx
on saved_prompts (fingerprint_hash);
