import { createClient } from "@supabase/supabase-js"

// Δημιουργία Supabase client για το client-side
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Δημιουργία Supabase client για το server-side
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL || ""
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  return createClient(supabaseUrl, supabaseServiceKey)
}
