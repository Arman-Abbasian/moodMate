import { Stack } from 'expo-router'
import '@/globals.css'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { AuthProvider } from '@/context/AuthContext'
import { useColorScheme, View } from 'react-native'
import Toast from 'react-native-toast-message'

export default function RootLayout() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <View className="flex-1 bg-background">
          <Stack screenOptions={{ headerShown: false }} />
          <Toast />
        </View>
      </Provider>
    </AuthProvider>
  )
}
