import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://ehucbddxitbgymcqcwrf.supabase.co';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVodWNiZGR4aXRiZ3ltY3Fjd3JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxMTcwMTAsImV4cCI6MjEwMzY5MzAxMH0.SZfMn5vyux0kchF3Lr31sfAXs30IPPgJb_SZWG-MW24';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
