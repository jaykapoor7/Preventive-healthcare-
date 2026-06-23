-- ============================================================
-- JUNO · Supabase schema
-- Preventive healthcare & patient-literacy platform
--
-- JUNO is fully functional WITHOUT a database — every module
-- computes locally in the browser. This schema powers OPTIONAL,
-- privacy-respecting features: saved trajectories, monthly
-- receipts, and anonymous, aggregate module analytics.
--
-- No clinical or diagnostic data is stored. Inputs are lifestyle
-- self-reports for educational visualisation only.
-- ============================================================

-- Extensions ---------------------------------------------------
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------------
-- profiles: lightweight, optional user profile (1:1 with auth.users)
-- ------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  region      text,                         -- optional state/region for context
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ------------------------------------------------------------------
-- future_patient_runs: saved "My Future Patient" results
-- ------------------------------------------------------------------
create table if not exists public.future_patient_runs (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users (id) on delete cascade,
  inputs           jsonb not null,          -- { age, sleep, movement, ... }
  prevention_score int  not null check (prevention_score between 0 and 100),
  energy_score     int  not null check (energy_score between 0 and 100),
  archetype        text,
  created_at       timestamptz not null default now()
);
create index if not exists future_patient_runs_user_idx
  on public.future_patient_runs (user_id, created_at desc);

-- ------------------------------------------------------------------
-- receipt_runs: saved monthly "Health Receipt" snapshots
-- ------------------------------------------------------------------
create table if not exists public.receipt_runs (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  month_label text not null,
  inputs      jsonb not null,
  subtotal    int  not null check (subtotal between 0 and 100),
  receipt_id  text not null,
  created_at  timestamptz not null default now()
);
create index if not exists receipt_runs_user_idx
  on public.receipt_runs (user_id, created_at desc);

-- ------------------------------------------------------------------
-- module_events: anonymous, aggregate usage signal (no PII)
-- Used to understand which literacy tools are most helpful.
-- ------------------------------------------------------------------
create table if not exists public.module_events (
  id          bigint generated always as identity primary key,
  module_slug text not null,
  event       text not null,               -- e.g. 'open', 'complete'
  session_key text,                         -- random client-side id, not a user id
  created_at  timestamptz not null default now()
);
create index if not exists module_events_module_idx
  on public.module_events (module_slug, created_at desc);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.profiles            enable row level security;
alter table public.future_patient_runs enable row level security;
alter table public.receipt_runs        enable row level security;
alter table public.module_events       enable row level security;

-- profiles: a user can read/write only their own row
create policy "profiles_self_select" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_self_upsert" on public.profiles
  for insert with check (auth.uid() = id);
create policy "profiles_self_update" on public.profiles
  for update using (auth.uid() = id);

-- future_patient_runs: owner-only access
create policy "fpr_owner_select" on public.future_patient_runs
  for select using (auth.uid() = user_id);
create policy "fpr_owner_insert" on public.future_patient_runs
  for insert with check (auth.uid() = user_id);
create policy "fpr_owner_delete" on public.future_patient_runs
  for delete using (auth.uid() = user_id);

-- receipt_runs: owner-only access
create policy "rr_owner_select" on public.receipt_runs
  for select using (auth.uid() = user_id);
create policy "rr_owner_insert" on public.receipt_runs
  for insert with check (auth.uid() = user_id);
create policy "rr_owner_delete" on public.receipt_runs
  for delete using (auth.uid() = user_id);

-- module_events: anyone (incl. anon) may insert a usage event;
-- nobody can read them back from the client (analytics read via service role).
create policy "events_anon_insert" on public.module_events
  for insert with check (true);

-- ------------------------------------------------------------------
-- Auto-update updated_at on profiles
-- ------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch
  before update on public.profiles
  for each row execute function public.touch_updated_at();
