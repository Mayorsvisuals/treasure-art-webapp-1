import { createClient } from '@supabase/supabase-js';
import { env } from '../config/env';

// Create a single supabase client for interacting with your database
export const supabase = (env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  ? createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  : null;
