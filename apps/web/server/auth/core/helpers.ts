import { createError, type H3Event } from 'h3'
import { getAuthProvider } from './factory'
import type { User } from './types'

export async function getUser(event: H3Event): Promise<User | null> {
  const provider = await getAuthProvider()
  return provider.getUser(event)
}

export async function requireUser(event: H3Event): Promise<User> {
  const user = await getUser(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  return user
}

