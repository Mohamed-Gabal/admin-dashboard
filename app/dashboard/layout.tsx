import React from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  )
}
export default Layout; 