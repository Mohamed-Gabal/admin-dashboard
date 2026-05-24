'use client'

import { useState } from 'react'
import { Shield, Edit, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import PageHeader from '@/components/shared/PageHeader'

const initialRoles = [
  {
    id: 1,
    name: 'Admin',
    color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20',
    users: 3,
    permissions: ['View Dashboard', 'Manage Users', 'Manage Subscriptions', 'View Reports', 'Manage Settings', 'Manage Roles'],
  },
  {
    id: 2,
    name: 'Manager',
    color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20',
    users: 8,
    permissions: ['View Dashboard', 'Manage Users', 'Manage Subscriptions', 'View Reports'],
  },
  {
    id: 3,
    name: 'Moderator',
    color: 'bg-green-50 text-green-600 dark:bg-green-900/20',
    users: 15,
    permissions: ['View Dashboard', 'Manage Users', 'View Reports'],
  },
  {
    id: 4,
    name: 'Viewer',
    color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20',
    users: 42,
    permissions: ['View Dashboard', 'View Reports'],
  },
]

const allPermissions = [
  'View Dashboard',
  'Manage Users',
  'Manage Subscriptions',
  'View Reports',
  'Manage Settings',
  'Manage Roles',
]

const RolesPage = () => {
  const [roles, setRoles] = useState(initialRoles)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Roles & Permissions"
        description="Manage user roles and their permissions"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {roles.map((role) => (
          <div key={role.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">

            {/* Role Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${role.color}`}>
                  <Shield size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white">{role.name}</h3>
                  <p className="text-xs text-gray-400">{role.users} users</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toast.success(`Editing ${role.name} role`)}
                  className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Edit size={15} />
                </button>
                <button
                  onClick={() => {
                    if (role.name === 'Admin') { toast.error("Can't delete Admin role!"); return }
                    setRoles(prev => prev.filter(r => r.id !== role.id))
                    toast.success(`${role.name} role deleted!`)
                  }}
                  className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            {/* Permissions */}
            <div className="space-y-2">
              {allPermissions.map((permission) => {
                const hasPermission = role.permissions.includes(permission)
                return (
                  <div key={permission} className="flex items-center justify-between py-1.5">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{permission}</span>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center
                      ${hasPermission ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`}>
                      {hasPermission && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}
export default RolesPage;