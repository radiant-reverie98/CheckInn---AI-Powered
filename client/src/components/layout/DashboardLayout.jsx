import React from 'react'
import { Outlet } from 'react-router-dom'
import OwnerTopbar from '../dashboard-owner/OwnerTopbar'
import OwnerSidebar from '../dashboard-owner/OwnerSidebar'

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      
      <OwnerSidebar />

      <div className="flex-1 flex flex-col">
        <OwnerTopbar />

        <main className="p-6">
          <Outlet />
        </main>
      </div>

    </div>
  )
}

export default DashboardLayout