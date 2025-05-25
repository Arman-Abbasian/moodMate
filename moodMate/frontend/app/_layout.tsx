import { Stack } from 'expo-router'
import './globals.css'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { AuthProvider } from '@/context/AuthContext'

export default function RootLayout() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }} />
      </Provider>
    </AuthProvider>
  )
}
