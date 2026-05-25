'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Users, LayoutDashboard, BarChart3, FileText, Bell, Settings, CreditCard, Package, ShieldCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'

const pages = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { label: 'Users', href: '/dashboard/users', icon: Users },
  { label: 'Subscriptions', href: '/dashboard/subscriptions', icon: CreditCard },
  { label: 'Plans', href: '/dashboard/plans', icon: Package },
  { label: 'Reports', href: '/dashboard/reports', icon: FileText },
  { label: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  { label: 'Roles & Permissions', href: '/dashboard/roles', icon: ShieldCheck },
]

const GlobalSearch = () => {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  // Users search
  const { data: usersData } = useQuery({
    queryKey: ['search-users', query],
    queryFn: async () => {
      if (query.length < 2) return null
      const res = await api.get(`/users/search?q=${query}&limit=3`)
      return res.data
    },
    enabled: query.length >= 2,
  })

  // Filter pages
  const filteredPages = query.length >= 1
    ? pages.filter(p => p.label.toLowerCase().includes(query.toLowerCase()))
    : []

  const hasResults = filteredPages.length > 0 || (usersData?.users?.length > 0)

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSelect = (href: string) => {
    router.push(href)
    setQuery('')
    setIsOpen(false)
  }

  return (
    <div ref={ref} className="relative w-48 lg:w-72">
      {/* Input */}
      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
        <Search size={16} className="text-gray-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true) }}
          onFocus={() => setIsOpen(true)}
          className="bg-transparent text-sm outline-none text-gray-600 dark:text-gray-300 w-full"
        />
      </div>

      {/* Results Dropdown */}
      {isOpen && query.length >= 1 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg z-50 overflow-hidden">

          {/* Pages */}
          {filteredPages.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase px-4 py-2 border-b border-gray-100 dark:border-gray-800">Pages</p>
              {filteredPages.map((page) => {
                const Icon = page.icon
                return (
                  <button
                    key={page.href}
                    onClick={() => handleSelect(page.href)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                  >
                    <Icon size={16} className="text-blue-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{page.label}</span>
                  </button>
                )
              })}
            </div>
          )}

          {/* Users */}
          {usersData?.users?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase px-4 py-2 border-b border-gray-100 dark:border-gray-800">Users</p>
              {usersData.users.map((user: any) => (
                <button
                  key={user.id}
                  onClick={() => handleSelect('/dashboard/users')}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                >
                  <img src={user.image} alt={user.firstName} className="w-7 h-7 rounded-full object-cover" />
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {!hasResults && (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-gray-400">No results for "{query}"</p>
            </div>
          )}

        </div>
      )}
    </div>
  )
}
export default GlobalSearch;