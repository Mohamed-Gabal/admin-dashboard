'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Search, Eye, Trash2, Users } from 'lucide-react'
import api from '@/lib/axios'
import Skeleton from '@/components/ui/Skeleton'
import ErrorState from '@/components/ui/ErrorState'
import EmptyState from '@/components/ui/EmptyState'
import PageHeader from '@/components/shared/PageHeader'
import toast from 'react-hot-toast'

const UsersPage = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [deletedIds, setDeletedIds] = useState<number[]>([])
  const limit = 10

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['users', page, search],
    queryFn: async () => {
      const url = search
        ? `/users/search?q=${search}&limit=${limit}&skip=${(page - 1) * limit}`
        : `/users?limit=${limit}&skip=${(page - 1) * limit}`
      const res = await api.get(url)
      return res.data
    },
  })

  const totalPages = Math.ceil((data?.total ?? 0) / limit)
  const filteredUsers = data?.users?.filter((u: any) => !deletedIds.includes(u.id)) ?? []

  return (
    <div className="space-y-6">

      <PageHeader title="Users" description="Manage all users" />

      {/* Search */}
      <div className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 w-full max-w-sm">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          className="bg-transparent text-sm outline-none text-gray-600 dark:text-gray-300 w-full"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">User</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">Username</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">Email</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">Phone</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">Role</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <Skeleton className="h-4 w-28" />
                      </div>
                    </td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-40" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-28" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
                  </tr>
                ))
              ) : isError ? (
                <tr>
                  <td colSpan={6}>
                    <ErrorState message="Failed to load users" onRetry={refetch} />
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <EmptyState
                      icon={Users}
                      title="No users found"
                      message={search ? `No results for "${search}"` : 'No users yet'}
                    />
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user: any) => (
                  <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={user.image} alt={user.firstName} className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-sm font-medium text-gray-800 dark:text-white">
                          {user.firstName} {user.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">@{user.username}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{user.phone}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        user.role === 'admin'
                          ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20'
                          : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toast.success(`Viewing ${user.firstName}`)}
                          className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setDeletedIds(prev => [...prev, user.id])
                            toast.success(`Deleted ${user.firstName}`)
                          }}
                          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!isError && !isLoading && filteredUsers.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
export default UsersPage;