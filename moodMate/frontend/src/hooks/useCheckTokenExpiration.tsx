import { useAuth } from '@/context/AuthContext'
import { isTokenExpired } from '@/utils/checkTokenExpiration'
import { storage } from '@/utils/storage'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'

const useCheckTokenExpiration = () => {
  const { setIsAuthenticated } = useAuth()
  const router = useRouter()
  useEffect(() => {
    const checkAuth = async () => {
      const token = await storage.getItem('accessToken')
      if (token && isTokenExpired(token)) {
        await storage.deleteItem('accessToken')
        setIsAuthenticated(false)
        router.navigate('/auth/login')
        return
      }

      setIsAuthenticated(!!token)
    }
    checkAuth()
  }, [])
}
export default useCheckTokenExpiration
