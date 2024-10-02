import React, { ReactNode } from 'react'

const DashboardLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div>{children}</div>
  )
}

export default DashboardLayout