import {
  LayoutDashboard,
  BarChart3,
  Users,
  CreditCard,
  Package,
  FileText,
  Bell,
  Settings,
  ShieldCheck,
} from 'lucide-react'

export const navItems = [
  {
    group: 'Main',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    ],
  },
  {
    group: 'Management',
    items: [
      { label: 'Users', href: '/dashboard/users', icon: Users },
      { label: 'Subscriptions', href: '/dashboard/subscriptions', icon: CreditCard },
      { label: 'Plans', href: '/dashboard/plans', icon: Package },
    ],
  },
  {
    group: 'Content',
    items: [
      { label: 'Reports', href: '/dashboard/reports', icon: FileText },
      { label: 'Notifications', href: '/dashboard/notifications', icon: Bell },
    ],
  },
  {
    group: 'System',
    items: [
      { label: 'Settings', href: '/dashboard/settings', icon: Settings },
      { label: 'Roles & Permissions', href: '/dashboard/roles', icon: ShieldCheck },
    ],
  },
]