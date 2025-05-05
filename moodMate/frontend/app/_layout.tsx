import { Stack } from 'expo-router'
import './globals.css'
import { useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import { setAccessToken } from '@/utils/tokenManager'
import { Provider } from 'react-redux'
import { store } from '@/store'

export default function RootLayout() {
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync('accessToken')
        if (storedToken) {
          setAccessToken(storedToken)
        }
      } catch (error) {
        console.error('Error loading access token:', error)
      }
    }

    loadToken()
  }, [])
  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  )
}
