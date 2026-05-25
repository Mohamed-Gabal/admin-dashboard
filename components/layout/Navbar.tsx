'use client'

import { Moon, Sun, Menu } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import GlobalSearch from '@/components/shared/GlobalSearch'
import NotificationsDropdown from '@/components/shared/NotificationsDropdown'
import useCurrentUser from '@/hooks/useCurrentUser'

interface NavbarProps {
  onMenuClick: () => void
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const user = useCurrentUser()

  useEffect(() => {
    setMounted(true)
  }, [])

  const initials = user
    ? `${user.firstName[0]}${user.lastName[0]}`
    : 'A'

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 lg:px-6">

      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
        >
          <Menu size={20} />
        </button>
        <GlobalSearch />
      </div>

      <div className="flex items-center gap-2">

        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}

        <NotificationsDropdown />

        {/* Avatar */}
        {user?.image ? (
          <img
            src={user.image}
            alt={user.firstName}
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold cursor-pointer">
            {initials}
          </div>
        )}

      </div>
    </header>
  )
}
export default Navbar;