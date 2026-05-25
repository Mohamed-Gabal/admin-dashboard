'use client'

import { useState, useRef, useEffect } from 'react'
import { Bell, Users, CreditCard, DollarSign, CheckCheck, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const notifications = [
  { id: 1, title: 'New user registered', message: 'Emily Johnson just created an account.', time: '2 min ago', read: false, type: 'user' },
  { id: 2, title: 'New subscription', message: 'Michael Williams subscribed to Pro plan.', time: '1 hour ago', read: false, type: 'subscription' },
  { id: 3, title: 'Payment received', message: '$299 payment received from Sophia Brown.', time: '3 hours ago', read: false, type: 'payment' },
  { id: 4, title: 'New user registered', message: 'James Davis just created an account.', time: '5 hours ago', read: true, type: 'user' },
  { id: 5, title: 'Subscription cancelled', message: 'Emma Miller cancelled her subscription.', time: '1 day ago', read: true, type: 'subscription' },
]

const typeConfig: Record<string, { icon: any; color: string }> = {
  user: { icon: Users, color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' },
  subscription: { icon: CreditCard, color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20' },
  payment: { icon: DollarSign, color: 'bg-green-50 text-green-600 dark:bg-green-900/20' },
}

const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [notifs, setNotifs] = useState(notifications)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const unreadCount = notifs.filter(n => !n.read).length

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  }

  const markRead = (id: number) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const dismiss = (id: number) => {
    setNotifs(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div ref={ref} className="relative">

      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl z-50 overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-xs bg-red-100 text-red-600 dark:bg-red-900/20 px-1.5 py-0.5 rounded-full font-medium">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
              >
                <CheckCheck size={12} />
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto">
            {notifs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                <Bell size={32} className="mb-2 opacity-30" />
                <p className="text-sm">No notifications</p>
              </div>
            ) : (
              notifs.map((n) => {
                const Icon = typeConfig[n.type].icon
                return (
                  <div
                    key={n.id}
                    onClick={() => markRead(n.id)}
                    className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors border-b border-gray-50 dark:border-gray-800 last:border-0
                      ${!n.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}
                    `}
                  >
                    <div className={`p-1.5 rounded-lg flex-shrink-0 mt-0.5 ${typeConfig[n.type].color}`}>
                      <Icon size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-semibold text-gray-800 dark:text-white truncate">{n.title}</p>
                        {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{n.message}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); dismiss(n.id) }}
                      className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )
              })
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 dark:border-gray-800 p-3">
            <button
              onClick={() => { router.push('/dashboard/notifications'); setIsOpen(false) }}
              className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium py-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              View all notifications →
            </button>
          </div>

        </div>
      )}
    </div>
  )
}
export default NotificationsDropdown;