import { isTokenExpired } from '@/utils/checkTokenExpiration'
import { storage } from '@/utils/storage'
import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'expo-router'

type AuthContextType = {
  isAuthenticated: boolean | null
  setIsAuthenticated: (value: boolean) => void
}
type AuthProviderProps = {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: null,
  setIsAuthenticated: () => {},
})

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props

  const router = useRouter()

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

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

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
