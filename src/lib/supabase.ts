import { createClient } from "@supabase/supabase-js";
import { publicEnv } from "./env";

const SUPABASE_URL = publicEnv.VITE_SUPABASE_URL?.trim() ?? "";
const SUPABASE_ANON_KEY = publicEnv.VITE_SUPABASE_ANON_KEY?.trim() ?? "";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn("Supabase credentials not configured. Product data will use the default in-memory catalog.");
}

export const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY)
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
