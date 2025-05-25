import { useAuth } from '@/context/AuthContext'
import { Stack, Redirect } from 'expo-router'

export default function AuthLayout() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated === null) return null

  if (isAuthenticated) {
    return <Redirect href="/" />
  }

  return <Stack screenOptions={{ headerShown: false }} />
}
