import { serverSupabaseClient } from '#supabase/server';
import { Database } from '@repo/supabase';
import { H3Event, EventHandlerRequest } from 'h3';

export async function getSupabaseServerClient(event: H3Event<EventHandlerRequest>) {
  return await serverSupabaseClient<Database>(event);
}
