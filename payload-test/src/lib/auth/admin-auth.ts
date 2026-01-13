import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function verifyAdminAuth(request: NextRequest): Promise<{ authorized: boolean; userId?: string; error?: string }> {
  try {
    const payload = await getPayload({ config })
    
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { authorized: false, error: 'No authorization token provided' }
    }

    const token = authHeader.substring(7)
    
    const user = await payload.auth({ headers: request.headers })
    
    if (!user || !user.user) {
      return { authorized: false, error: 'Invalid or expired token' }
    }

    if (user.user.role !== 'admin') {
      return { authorized: false, error: 'Insufficient permissions' }
    }

    return { authorized: true, userId: user.user.id }
  } catch (error) {
    console.error('Admin auth verification error:', error)
    return { authorized: false, error: 'Authentication failed' }
  }
}

export async function logAdminAction(
  action: string,
  userId: string,
  details: Record<string, unknown>,
  ipAddress: string
): Promise<void> {
  try {
    console.log('[AUDIT LOG]', {
      timestamp: new Date().toISOString(),
      action,
      userId,
      ipAddress,
      details,
    })
  } catch (error) {
    console.error('Failed to log admin action:', error)
  }
}
