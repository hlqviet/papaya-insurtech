import { useLocalStorage } from '@uidotdev/usehooks'
import { createContext, PropsWithChildren, useCallback, useMemo } from 'react'

import { Auth } from '../../hooks/useAuth/types'
import { API_HOST } from '../../lib/constants'

type AuthContextType = {
  user: Auth | null
  login: (data: { username: string; password: string }) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => Promise.resolve(),
  logout: () => {}
})

const AuthProvider = (props: PropsWithChildren) => {
  const { children } = props
  const [user, setUser] = useLocalStorage<Auth | null>('user', null)

  const login = useCallback(
    async (data: { username: string; password: string }) => {
      const { username, password } = data
      const response = await fetch(`${API_HOST}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      setUser((await response.json()) as Auth)
    },
    [setUser]
  )

  const logout = useCallback(() => {
    setUser(null)
  }, [setUser])

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [login, logout, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
