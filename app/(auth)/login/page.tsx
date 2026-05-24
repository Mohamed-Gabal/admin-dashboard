'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import api from '@/lib/axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

const LoginPage = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await api.post('/auth/login', {
        username: data.username,
        password: data.password,
        expiresInMins: 60,
      })

    document.cookie = `token=${res.data.accessToken}; path=/`
    localStorage.setItem('user', JSON.stringify(res.data))

      toast.success('Welcome back! 👋')
      router.push('/dashboard')

    } catch {
      toast.error('Invalid username or password')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Gabal</h1>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Username */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Username
              </label>
              <input
                {...register('username')}
                type="text"
                placeholder="Enter your username"
                className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm outline-none transition-colors
                  ${errors.username
                    ? 'border-red-400 focus:border-red-500'
                    : 'border-gray-200 dark:border-gray-700 focus:border-blue-500'
                  }`}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Password
              </label>
              <input
                {...register('password')}
                type="password"
                placeholder="Enter your password"
                className={`w-full px-4 py-2.5 rounded-lg border bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm outline-none transition-colors
                  ${errors.password
                    ? 'border-red-400 focus:border-red-500'
                    : 'border-gray-200 dark:border-gray-700 focus:border-blue-500'
                  }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-lg transition-colors"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>

          </form>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:underline font-medium">
              Sign up
            </Link>
          </p>

        </div>

        {/* Test Credentials */}
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
          <p className="text-xs font-medium text-blue-600 mb-2">Test Credentials:</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Username: <span className="font-mono font-bold">emilys</span></p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Password: <span className="font-mono font-bold">emilyspass</span></p>
        </div>

      </div>
    </div>
  )
}
export default LoginPage