'use client'

import { useQuery } from '@tanstack/react-query'
import { Users, CreditCard, TrendingUp, Activity } from 'lucide-react'
import StatsCard from '@/components/ui/StatsCard'
import Skeleton from '@/components/ui/Skeleton'
import ErrorState from '@/components/ui/ErrorState'
import api from '@/lib/axios'
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

const chartData = [
  { month: 'Jan', users: 40, revenue: 2400 },
  { month: 'Feb', users: 60, revenue: 3200 },
  { month: 'Mar', users: 55, revenue: 2900 },
  { month: 'Apr', users: 80, revenue: 4100 },
  { month: 'May', users: 95, revenue: 4800 },
  { month: 'Jun', users: 120, revenue: 5600 },
]

const DashboardPage = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await api.get('/users?limit=5')
      return res.data
    },
  })

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, Admin 👋</p>
      </div>

      {/* Error */}
      {isError && <ErrorState message="Failed to load dashboard data" onRetry={refetch} />}

      {/* Stats Cards */}
      {!isError && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Users" value={data?.total ?? '...'} icon={Users} color="blue" trend={12} />
          <StatsCard title="Revenue" value="$24,500" icon={CreditCard} color="green" trend={8} />
          <StatsCard title="Subscriptions" value="1,200" icon={TrendingUp} color="purple" trend={-3} />
          <StatsCard title="Active Now" value="42" icon={Activity} color="orange" trend={5} />
        </div>
      )}

      {/* Chart */}
      {!isError && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-6">Growth Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Recent Users */}
      {!isError && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-4">Recent Users</h2>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="w-9 h-9 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {data?.users?.map((user: any) => (
                <div key={user.id} className="flex items-center gap-3">
                  <img src={user.image} alt={user.firstName} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  )
}
export default DashboardPage;