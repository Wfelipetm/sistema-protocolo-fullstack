"use client"

import type React from "react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface DashboardLayoutWrapperProps {
  children: React.ReactNode
}

export default function DashboardLayoutWrapper({ children }: DashboardLayoutWrapperProps) {
  return <DashboardLayout>{children}</DashboardLayout>
}
