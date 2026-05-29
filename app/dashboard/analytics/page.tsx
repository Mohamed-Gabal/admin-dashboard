'use client'

import { useQuery } from '@tanstack/react-query'
import PageHeader from '@/components/shared/PageHeader'
import StatsCard from '@/components/ui/StatsCard'
import ErrorState from '@/components/ui/ErrorState'
import api from '@/lib/axios'
import { Users, TrendingUp, ShoppingCart, DollarSign } from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const weeklyData = [
  { day: 'Mon', visits: 240, signups: 12 },
  { day: 'Tue', visits: 380, signups: 19 },
  { day: 'Wed', visits: 310, signups: 15 },
  { day: 'Thu', visits: 520, signups: 28 },
  { day: 'Fri', visits: 480, signups: 24 },
  { day: 'Sat', visits: 290, signups: 10 },
  { day: 'Sun', visits: 210, signups: 8 },
]

const revenueData = [
  { month: 'Jan', revenue: 4200 },
  { month: 'Feb', revenue: 5800 },
  { month: 'Mar', revenue: 4900 },
  { month: 'Apr', revenue: 7200 },
  { month: 'May', revenue: 8100 },
  { month: 'Jun', revenue: 9400 },
]

const AnalyticsPage = () => {
  const { data, isError, refetch } = useQuery({
    queryKey: ['analytics-users'],
    queryFn: async () => {
      const res = await api.get('/users?limit=1')
      return res.data
    },
  })

  if (isError) {
    return (
      <div className="space-y-6">
        <PageHeader title="Analytics" description="Track your business performance" />
        <ErrorState message="Failed to load analytics data" onRetry={refetch} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Track your business performance" />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Users" value={data?.total ?? '...'} icon={Users} color="blue" trend={12} />
        <StatsCard title="Monthly Revenue" value="$9,400" icon={DollarSign} color="green" trend={16} />
        <StatsCard title="Conversions" value="8.2%" icon={TrendingUp} color="purple" trend={4} />
        <StatsCard title="Total Orders" value="1,840" icon={ShoppingCart} color="orange" trend={9} />
      </div>

      {/* Area Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-6">Weekly Traffic & Signups</h2>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={weeklyData}>
            <defs>
              <linearGradient id="visits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="signups" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Area yAxisId="left" type="monotone" dataKey="visits" stroke="#3b82f6" fill="url(#visits)" strokeWidth={2} />
            <Area yAxisId="right" type="monotone" dataKey="signups" stroke="#10b981" fill="url(#signups)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-6">Monthly Revenue</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="revenue" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}
export default AnalyticsPage;