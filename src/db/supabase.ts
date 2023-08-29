import { PostgrestError, createClient } from '@supabase/supabase-js'
import { Database } from '@/utils/supabase'

const API_URL = process.env.SUPABASE_URL || ''
const ANON_KEY = process.env.SUPABASE_ANON_KEY || ''

const supabase = createClient<Database>(
  API_URL,
  ANON_KEY,
  {
    db: { schema: 'public' },
    auth: {
      autoRefreshToken: true,
      persistSession: false,
      detectSessionInUrl: false
    },
  }
)

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never
export type DbResultErr = PostgrestError

export default supabase