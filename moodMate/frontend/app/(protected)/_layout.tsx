import { useAuth } from '@/context/AuthContext'
import { Redirect, Stack } from 'expo-router'

export default function AuthLayout() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Redirect href="/auth/login" />
  }

  return <Stack screenOptions={{ headerShown: false }} />
}
