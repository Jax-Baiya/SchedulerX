import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function logout() {
  if (typeof window !== 'undefined') localStorage.removeItem('token');
  supabase.auth.signOut();
}

export function getCurrentUser() {
  return supabase.auth.getUser();
}

export { supabase }; // Export supabase client for use in other components
