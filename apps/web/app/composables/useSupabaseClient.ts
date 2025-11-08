import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export function useSupabaseClient() {
  const config = useRuntimeConfig()

  const client = useState<SupabaseClient>('supabase', () => {
    if (!config.public.SUPABASE_URL || !config.public.SUPABASE_ANON_KEY) {
      throw new Error('SUPABASE_URL / SUPABASE_ANON_KEY が設定されていません。nuxt.config の runtimeConfig.public を確認してください。')
    }

    return createClient(
      config.public.SUPABASE_URL,
      config.public.SUPABASE_ANON_KEY,
      {
        auth: {
          persistSession: true, 
          autoRefreshToken: true, 
          detectSessionInUrl: true,
        },
      }
    )
  })

  return client
}
