'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { navItems } from '@/constant/navigation'
import { X, LogOut } from 'lucide-react'
import toast from 'react-hot-toast'
import { useState } from 'react'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import useCurrentUser from '@/hooks/useCurrentUser'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const [showLogout, setShowLogout] = useState(false)
  const user = useCurrentUser()

  const handleLogout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    localStorage.clear()
    toast.success('Logged out!')
    router.push('/login')
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-screen w-64 z-30
        bg-white dark:bg-gray-900 
        border-r border-gray-200 dark:border-gray-800
        flex flex-col
        transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}>

        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800">
          <span className="text-xl font-bold text-blue-600">Gabal</span>
          <button onClick={onClose} className="lg:hidden text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navItems.map((group) => (
            <div key={group.group} className="mb-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
                {group.group}
              </p>
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-1 text-sm font-medium transition-colors
                      ${isActive
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                      }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {user?.image ? (
                <img src={user.image} alt={user.firstName} className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                  {user ? `${user.firstName[0]}${user.lastName[0]}` : 'A'}
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user ? `${user.firstName} ${user.lastName}` : 'Admin'}
                </p>
                <p className="text-xs text-gray-400">{user?.email ?? 'admin@saas.com'}</p>
              </div>
            </div>
            <button
              onClick={() => setShowLogout(true)}
              className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

      </aside>

      <ConfirmDialog
        isOpen={showLogout}
        title="Sign Out"
        message="Are you sure you want to sign out?"
        confirmLabel="Sign Out"
        cancelLabel="Cancel"
        onConfirm={handleLogout}
        onCancel={() => setShowLogout(false)}
      />
    </>
  )
}
export default Sidebar;