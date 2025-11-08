import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const url = config.public.SUPABASE_URL
  const key = config.public.SUPABASE_ANON_KEY

  if (!url || !key) {
    // クライアント側なので console.warn に留めるのもアリ
    throw new Error('SUPABASE_URL / SUPABASE_ANON_KEY が未設定です')
  }

  const client = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  })

  return { provide: { supabase: client } }
})

