import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: number
  color?: 'blue' | 'green' | 'purple' | 'orange'
}

const colors = {
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
  purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
  orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
}

const StatsCard = ({ title, value, icon: Icon, trend, color = 'blue' }: StatsCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon size={18} />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
      {trend !== undefined && (
        <p className={`text-xs mt-2 font-medium ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
        </p>
      )}
    </div>
  )
}
export default StatsCard