import { createClient } from "@supabase/supabase-js";
import { Database } from "./database";

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(
  process.env.SUPABASE_URL as string || "https://phuduhtxapuzbkvindrj.supabase.co",
  process.env.SUPABASE_KEY as string || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBodWR1aHR4YXB1emJrdmluZHJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk1ODI3MjksImV4cCI6MjAzNTE1ODcyOX0.BklC2Ra0y-91ZdyAZkwd1tmeFAEDdW4IX18mQQcljkU"
);

export default supabase