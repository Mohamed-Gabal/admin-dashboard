'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { User, Lock, Bell, Palette } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import { useTheme } from 'next-themes'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'password', label: 'Password', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
]

const inputClass = "w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm outline-none focus:border-blue-500 transition-colors"

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const { theme, setTheme } = useTheme()

  const [profile, setProfile] = useState({
    name: 'Admin',
    email: 'admin@saas.com',
    username: 'admin',
    bio: '',
  })

  const [password, setPassword] = useState({
    current: '', new: '', confirm: '',
  })

  const [notifSettings, setNotifSettings] = useState({
    newUser: true,
    newSubscription: true,
    payments: true,
    marketing: false,
  })

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your account and preferences" />

      <div className="flex gap-6 flex-col lg:flex-row">

        {/* Tabs Sidebar */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors mb-1
                    ${activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                    }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-5">
                <h2 className="text-base font-semibold text-gray-800 dark:text-white">Profile Information</h2>

                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                    A
                  </div>
                  <button className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    Change Avatar
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Full Name</label>
                    <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Username</label>
                    <input type="text" value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value })} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Email</label>
                  <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Write a short bio..."
                    rows={3}
                    className={inputClass}
                  />
                </div>
                <button onClick={() => toast.success('Profile updated!')} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                  Save Changes
                </button>
              </div>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <div className="space-y-5">
                <h2 className="text-base font-semibold text-gray-800 dark:text-white">Change Password</h2>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Current Password</label>
                  <input type="password" value={password.current} onChange={(e) => setPassword({ ...password, current: e.target.value })} className={inputClass} placeholder="••••••••" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">New Password</label>
                  <input type="password" value={password.new} onChange={(e) => setPassword({ ...password, new: e.target.value })} className={inputClass} placeholder="••••••••" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Confirm Password</label>
                  <input type="password" value={password.confirm} onChange={(e) => setPassword({ ...password, confirm: e.target.value })} className={inputClass} placeholder="••••••••" />
                </div>
                <button
                  onClick={() => {
                    if (password.new !== password.confirm) { toast.error("Passwords don't match!"); return }
                    toast.success('Password updated!')
                    setPassword({ current: '', new: '', confirm: '' })
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Update Password
                </button>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-5">
                <h2 className="text-base font-semibold text-gray-800 dark:text-white">Notification Preferences</h2>
                {[
                  { key: 'newUser', label: 'New user registered', desc: 'Get notified when a new user signs up' },
                  { key: 'newSubscription', label: 'New subscription', desc: 'Get notified on new subscriptions' },
                  { key: 'payments', label: 'Payment received', desc: 'Get notified when a payment is received' },
                  { key: 'marketing', label: 'Marketing emails', desc: 'Receive marketing and promotional emails' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">{item.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifSettings(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                      className={`relative w-11 h-6 rounded-full transition-colors ${notifSettings[item.key as keyof typeof notifSettings] ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${notifSettings[item.key as keyof typeof notifSettings] ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
                <button onClick={() => toast.success('Preferences saved!')} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                  Save Preferences
                </button>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-5">
                <h2 className="text-base font-semibold text-gray-800 dark:text-white">Appearance</h2>
                <p className="text-sm text-gray-500">Choose your preferred theme</p>
                <div className="grid grid-cols-3 gap-3">
                  {['light', 'dark', 'system'].map((t) => (
                    <button
                      key={t}
                      onClick={() => { setTheme(t); toast.success(`${t} mode enabled!`) }}
                      className={`p-4 rounded-xl border-2 transition-colors capitalize text-sm font-medium
                        ${theme === t
                          ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-300'
                        }`}
                    >
                      {t === 'light' ? '☀️' : t === 'dark' ? '🌙' : '💻'} {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
export default SettingsPage;