'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import toast from 'react-hot-toast'
import PageHeader from '@/components/shared/PageHeader'

const plans = [
  {
    id: 1,
    name: 'Basic',
    price: 9,
    color: 'border-gray-200 dark:border-gray-700',
    badge: '',
    features: [
      '5 Users',
      '10GB Storage',
      'Basic Analytics',
      'Email Support',
      'API Access',
    ],
  },
  {
    id: 2,
    name: 'Pro',
    price: 29,
    color: 'border-blue-500',
    badge: 'Most Popular',
    features: [
      '25 Users',
      '100GB Storage',
      'Advanced Analytics',
      'Priority Support',
      'API Access',
      'Custom Integrations',
      'Team Collaboration',
    ],
  },
  {
    id: 3,
    name: 'Enterprise',
    price: 99,
    color: 'border-purple-500',
    badge: 'Best Value',
    features: [
      'Unlimited Users',
      '1TB Storage',
      'Full Analytics Suite',
      '24/7 Dedicated Support',
      'API Access',
      'Custom Integrations',
      'Team Collaboration',
      'SSO & SAML',
      'SLA Guarantee',
    ],
  },
]

const PlansPage = () => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')
  const [current, setCurrent] = useState(2)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Plans"
        description="Manage your subscription plans"
      />

      {/* Billing Toggle */}
      <div className="flex items-center gap-3">
        <span className={`text-sm font-medium ${billing === 'monthly' ? 'text-gray-800 dark:text-white' : 'text-gray-400'}`}>Monthly</span>
        <button
          onClick={() => setBilling(b => b === 'monthly' ? 'yearly' : 'monthly')}
          className={`relative w-12 h-6 rounded-full transition-colors ${billing === 'yearly' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${billing === 'yearly' ? 'translate-x-7' : 'translate-x-1'}`} />
        </button>
        <span className={`text-sm font-medium ${billing === 'yearly' ? 'text-gray-800 dark:text-white' : 'text-gray-400'}`}>
          Yearly <span className="text-green-500 text-xs font-semibold">-20%</span>
        </span>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const price = billing === 'yearly' ? Math.floor(plan.price * 0.8) : plan.price
          const isCurrentPlan = current === plan.id

          return (
            <div
              key={plan.id}
              className={`relative bg-white dark:bg-gray-900 rounded-2xl border-2 p-6 transition-shadow hover:shadow-md flex flex-col ${plan.color}`}
            >
              {/* Badge */}
              {plan.badge && (
                <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full text-white
                  ${plan.name === 'Pro' ? 'bg-blue-600' : 'bg-purple-600'}`}>
                  {plan.badge}
                </span>
              )}

              {/* Plan Info */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">{plan.name}</h3>
                <div className="flex items-end gap-1 mt-2">
                  <span className="text-3xl font-bold text-gray-800 dark:text-white">${price}</span>
                  <span className="text-gray-400 text-sm mb-1">/month</span>
                </div>
                {billing === 'yearly' && (
                  <p className="text-xs text-green-500 font-medium mt-1">Billed yearly — Save ${(plan.price - price) * 12}/yr</p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Check size={16} className="text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                onClick={() => {
                  setCurrent(plan.id)
                  toast.success(`Switched to ${plan.name} plan!`)
                }}
                disabled={isCurrentPlan}
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isCurrentPlan
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-default'
                    : plan.name === 'Pro'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : plan.name === 'Enterprise'
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
              >
                {isCurrentPlan ? '✓ Current Plan' : `Upgrade to ${plan.name}`}
              </button>
            </div>
          )
        })}
      </div>

    </div>
  )
}
export default PlansPage;