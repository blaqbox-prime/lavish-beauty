import { createClient } from "@supabase/supabase-js";
import {Database} from '@/lib/database.types'

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default supabase;
