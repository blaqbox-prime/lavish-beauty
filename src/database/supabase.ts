import { createClient } from "@supabase/supabase-js";
import { Database } from "./database";

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);
