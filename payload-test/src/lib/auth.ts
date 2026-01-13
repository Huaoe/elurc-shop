import { cookies } from 'next/headers'

export const isAdmin = async (): Promise<boolean> => {
  try {
    const cookieStore = await cookies()
    const payloadToken = cookieStore.get('payload-token')
    
    if (!payloadToken) {
      return false
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
      headers: {
        Authorization: `JWT ${payloadToken.value}`,
      },
    })

    if (!response.ok) {
      return false
    }

    const data = await response.json()
    return data.user?.role === 'admin'
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}

export const requireAdmin = async (): Promise<void> => {
  const admin = await isAdmin()
  if (!admin) {
    throw new Error('Unauthorized: Admin access required')
  }
}
