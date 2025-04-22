import type React from "react"
import { AuthCheck } from "@/components/auth/auth-check"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthCheck>{children}</AuthCheck>
}
