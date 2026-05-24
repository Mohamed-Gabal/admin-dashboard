'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type RegisterForm = z.infer<typeof registerSchema>

const RegisterPage = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterForm) => {
    try {
      toast.success('Account created successfully! 🎉')
      router.push('/login')
    } catch {
      toast.error('Something went wrong')
    }
  }

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-2.5 rounded-lg border bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm outline-none transition-colors
    ${hasError
      ? 'border-red-400 focus:border-red-500'
      : 'border-gray-200 dark:border-gray-700 focus:border-blue-500'
    }`

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Gabal</h1>
          <p className="text-gray-500 mt-2">Create your account</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* First + Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                  First Name
                </label>
                <input
                  {...register('firstName')}
                  type="text"
                  placeholder="John"
                  className={inputClass(!!errors.firstName)}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                  Last Name
                </label>
                <input
                  {...register('lastName')}
                  type="text"
                  placeholder="Doe"
                  className={inputClass(!!errors.lastName)}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="john@example.com"
                className={inputClass(!!errors.email)}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Username
              </label>
              <input
                {...register('username')}
                type="text"
                placeholder="johndoe"
                className={inputClass(!!errors.username)}
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
                placeholder="Min 6 characters"
                className={inputClass(!!errors.password)}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Confirm Password
              </label>
              <input
                {...register('confirmPassword')}
                type="password"
                placeholder="Repeat your password"
                className={inputClass(!!errors.confirmPassword)}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-lg transition-colors mt-2"
            >
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </button>

          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}
export default RegisterPage