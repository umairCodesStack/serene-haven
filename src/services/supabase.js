import { createClient } from "@supabase/supabase-js";

//storage/v1/object/public/cabins/cabin-001.jpg
export const supabaseUrl = "https://chyickgxgfddmcjnridl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoeWlja2d4Z2ZkZG1jam5yaWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2MjA4MzAsImV4cCI6MjA4NTE5NjgzMH0.RRb1M16kdISCmjtR-wOIw7ns0uP1QMTel8ExwIyWKBw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
