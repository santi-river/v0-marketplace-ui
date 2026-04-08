"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
  isAuthenticated: boolean
  email: string | null
  login: (email: string) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check for existing auth on mount
    const storedEmail = localStorage.getItem("auth_email")
    const storedToken = localStorage.getItem("auth_token")

    if (storedEmail && storedToken) {
      setIsAuthenticated(true)
      setEmail(storedEmail)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Redirect to login if not authenticated and trying to access protected routes
    if (!isLoading && !isAuthenticated) {
      const protectedRoutes = ["/proyecto"]
      const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
      
      if (isProtectedRoute) {
        router.push("/login")
      }
    }
  }, [isLoading, isAuthenticated, pathname, router])

  const login = (userEmail: string) => {
    localStorage.setItem("auth_email", userEmail)
    localStorage.setItem("auth_token", "simulated_token_" + Date.now())
    setEmail(userEmail)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("auth_email")
    localStorage.removeItem("auth_token")
    setEmail(null)
    setIsAuthenticated(false)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, email, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
