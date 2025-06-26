import { Stack } from 'expo-router'
import '@/globals.css'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { AuthProvider } from '@/context/AuthContext'
import { View } from 'react-native'

export default function RootLayout() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <View className="flex-1 bg-background">
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </Provider>
    </AuthProvider>
  )
}
