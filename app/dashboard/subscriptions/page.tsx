'use client'

import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { useState } from 'react'
import api from '@/lib/axios'
import Skeleton from '@/components/ui/Skeleton'

const SubscriptionsPage = () => {
  const [search, setSearch] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['products', search],
    queryFn: async () => {
      const url = search
        ? `/products/search?q=${search}`
        : `/products?limit=10`
      const res = await api.get(url)
      return res.data
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Subscriptions</h1>
        <p className="text-gray-500 mt-1">Manage all subscriptions and plans</p>
      </div>

      <div className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 w-full max-w-sm">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-sm outline-none text-gray-600 dark:text-gray-300 w-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
                <Skeleton className="h-4 w-32 mb-3" />
                <Skeleton className="h-6 w-20 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))
          : data?.products?.map((product: any) => (
              <div key={product.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20">
                    {product.category}
                  </span>
                  <span className="text-sm font-bold text-green-600">${product.price}</span>
                </div>
                <p className="text-sm font-semibold text-gray-800 dark:text-white mb-1">{product.title}</p>
                <p className="text-xs text-gray-400 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-400">Stock: {product.stock}</span>
                  <span className="text-xs text-yellow-500">⭐ {product.rating}</span>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}
export default SubscriptionsPage;