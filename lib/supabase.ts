import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Optional Supabase client. JUNO works fully without a backend — every module
 * computes locally in the browser. When env vars are present, Supabase is used
 * for optional, privacy-respecting features (saved trajectories, anonymous
 * module analytics). It is created lazily so the app never crashes when unset.
 */
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  if (!client) client = createClient(url, anon);
  return client;
}

export const isSupabaseEnabled = () =>
  Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
