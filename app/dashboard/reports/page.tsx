'use client'

import { useQuery } from '@tanstack/react-query'
import PageHeader from '@/components/shared/PageHeader'
import api from '@/lib/axios'
import Skeleton from '@/components/ui/Skeleton'
import ErrorState from '@/components/ui/ErrorState'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'

const monthlyData = [
  { month: 'Jan', revenue: 4200, subscriptions: 30 },
  { month: 'Feb', revenue: 5800, subscriptions: 45 },
  { month: 'Mar', revenue: 4900, subscriptions: 38 },
  { month: 'Apr', revenue: 7200, subscriptions: 60 },
  { month: 'May', revenue: 8100, subscriptions: 72 },
  { month: 'Jun', revenue: 9400, subscriptions: 85 },
]

const planData = [
  { name: 'Basic', value: 400 },
  { name: 'Pro', value: 300 },
  { name: 'Enterprise', value: 150 },
]

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981']

const ReportsPage = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['reports-users'],
    queryFn: async () => {
      const res = await api.get('/users?limit=5')
      return res.data
    },
  })

  if (isError) {
    return (
      <div className="space-y-6">
        <PageHeader title="Reports" description="Overview of your business performance" />
        <ErrorState message="Failed to load reports data" onRetry={refetch} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Reports" description="Overview of your business performance" />

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Revenue', value: '$49,600', change: '+18%' },
          { label: 'Total Subscriptions', value: '330', change: '+12%' },
          { label: 'Avg. Revenue/User', value: '$150', change: '+5%' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
            <p className="text-xs text-green-500 font-medium mt-1">{stat.change} from last period</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-6">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-6">Plan Distribution</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={planData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value">
                {planData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Top Users */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-4">Top Users</h2>
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="w-9 h-9 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {data?.users?.map((user: any, i: number) => (
              <div key={user.id} className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-400 w-5">{i + 1}</span>
                <img src={user.image} alt={user.firstName} className="w-9 h-9 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
                <span className="text-sm font-semibold text-green-600">
                  ${Math.floor(Math.random() * 500 + 100)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
export default ReportsPage;