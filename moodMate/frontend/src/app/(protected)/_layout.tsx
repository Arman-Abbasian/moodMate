import { useAuth } from '@/context/AuthContext'
import { Redirect } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import { Tabs } from 'expo-router'
import { colors } from '@/constants/color'

export default function ProtectedLayout() {
  //hooks
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Redirect href="/auth/login" />
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="statistic"
        options={{
          title: 'statistics',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          title: 'Logout',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
