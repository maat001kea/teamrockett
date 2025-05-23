import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://laqizwqplonobdzjohhg.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhcWl6d3FwbG9ub2JkempvaGhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NDExNjksImV4cCI6MjA2MzUxNzE2OX0.4SOmkKpvr9mU4DgspnurlE0k8R9WjH3Rbz7nggO2xC0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
