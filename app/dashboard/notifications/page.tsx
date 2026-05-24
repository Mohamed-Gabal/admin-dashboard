'use client'

import { useState } from 'react'
import { Bell, CheckCheck, Trash2, Users, CreditCard, DollarSign } from 'lucide-react'
import toast from 'react-hot-toast'
import PageHeader from '@/components/shared/PageHeader'

const initialNotifications = [
  { id: 1, title: 'New user registered', message: 'Emily Johnson just created an account.', time: '2 min ago', read: false, type: 'user' },
  { id: 2, title: 'New subscription', message: 'Michael Williams subscribed to Pro plan.', time: '1 hour ago', read: false, type: 'subscription' },
  { id: 3, title: 'Payment received', message: '$299 payment received from Sophia Brown.', time: '3 hours ago', read: false, type: 'payment' },
  { id: 4, title: 'New user registered', message: 'James Davis just created an account.', time: '5 hours ago', read: true, type: 'user' },
  { id: 5, title: 'Subscription cancelled', message: 'Emma Miller cancelled her subscription.', time: '1 day ago', read: true, type: 'subscription' },
  { id: 6, title: 'Payment received', message: '$599 payment received from Olivia Wilson.', time: '2 days ago', read: true, type: 'payment' },
]

const typeConfig: Record<string, { icon: any; color: string }> = {
  user: { icon: Users, color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' },
  subscription: { icon: CreditCard, color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20' },
  payment: { icon: DollarSign, color: 'bg-green-50 text-green-600 dark:bg-green-900/20' },
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const unreadCount = notifications.filter(n => !n.read).length

  const filtered = filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    toast.success('All marked as read!')
  }

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
    toast.success('Notification deleted!')
  }

  const markRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  return (
    <div className="space-y-6">

      <PageHeader
        title="Notifications"
        description={`${unreadCount} unread notifications`}
        action={
          unreadCount > 0 ? (
            <button
              onClick={markAllRead}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              <CheckCheck size={16} />
              Mark all read
            </button>
          ) : undefined
        }
      />

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['all', 'unread'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize
              ${filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50'
              }`}
          >
            {f} {f === 'unread' && unreadCount > 0 && `(${unreadCount})`}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden w-full">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Bell size={40} className="mb-3 opacity-30" />
            <p className="text-sm font-medium">No notifications</p>
            <p className="text-xs mt-1">You're all caught up!</p>
          </div>
        ) : (
          filtered.map((n, i) => {
            const Icon = typeConfig[n.type].icon
            return (
              <div
                key={n.id}
                onClick={() => markRead(n.id)}
                className={`flex items-start gap-4 px-6 py-4 cursor-pointer transition-colors
                  ${i !== filtered.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}
                  ${!n.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}
                `}
              >
                {/* Icon */}
                <div className={`p-2 rounded-lg mt-0.5 flex-shrink-0 ${typeConfig[n.type].color}`}>
                  <Icon size={16} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{n.title}</p>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{n.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                </div>

                {/* Delete */}
                <button
                  onClick={(e) => { e.stopPropagation(); deleteNotification(n.id) }}
                  className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-300 hover:text-red-500 transition-colors flex-shrink-0 cursor-pointer"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            )
          })
        )}
      </div>

    </div>
  )
}
export default NotificationsPage;