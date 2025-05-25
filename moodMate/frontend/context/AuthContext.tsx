import { storage } from '@/utils/storage'
import { createContext, useContext, useEffect, useState } from 'react'

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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const token = await storage.getItem('accessToken')
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
