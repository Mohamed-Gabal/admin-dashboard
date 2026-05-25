import { useEffect, useState } from 'react'

interface CurrentUser {
  firstName: string
  lastName: string
  email: string
  image: string
  username: string
}

const useCurrentUser = () => {
  const [user, setUser] = useState<CurrentUser | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

  return user
}
export default useCurrentUser;