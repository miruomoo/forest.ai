"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TimeFrameSelector } from "../../../components/time-frame-selector"
import { PortfolioLineChart } from "../../../components/portfolio-line-chart"
import { ThemeToggle } from "@/components/theme-toggle"

export default function NetWorthPage() {
  const [timeFrame, setTimeFrame] = useState("1Y")

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Net Worth Tracker</h1>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div>
                  <CardTitle>Net Worth History</CardTitle>
                  <CardDescription>Track your total net worth over time</CardDescription>
                </div>
                <TimeFrameSelector onTimeFrameChange={(tf) => setTimeFrame(tf)} defaultTimeFrame="1Y" />
              </div>
            </CardHeader>
            <CardContent>
              <PortfolioLineChart timeFrame={timeFrame} title="Net Worth" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Net Worth Breakdown</CardTitle>
              <CardDescription>Your assets and liabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Assets</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="font-medium">Investments</p>
                        <p className="text-sm text-muted-foreground">Stocks, ETFs, Bonds</p>
                      </div>
                      <p className="font-medium">$198,750.00</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="font-medium">Real Estate</p>
                        <p className="text-sm text-muted-foreground">Primary Residence</p>
                      </div>
                      <p className="font-medium">$450,000.00</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="font-medium">Cash & Equivalents</p>
                        <p className="text-sm text-muted-foreground">Bank Accounts, CDs</p>
                      </div>
                      <p className="font-medium">$45,231.89</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="font-medium">Retirement Accounts</p>
                        <p className="text-sm text-muted-foreground">401(k), IRA</p>
                      </div>
                      <p className="font-medium">$125,000.00</p>
                    </div>
                    <div className="flex items-center justify-between border-t pt-4">
                      <p className="font-medium">Total Assets</p>
                      <p className="font-bold">$818,981.89</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-medium">Liabilities</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="font-medium">Mortgage</p>
                        <p className="text-sm text-muted-foreground">Primary Residence</p>
                      </div>
                      <p className="font-medium text-rose-500">$320,000.00</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="font-medium">Auto Loan</p>
                        <p className="text-sm text-muted-foreground">Vehicle Financing</p>
                      </div>
                      <p className="font-medium text-rose-500">$18,500.00</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="font-medium">Student Loans</p>
                        <p className="text-sm text-muted-foreground">Education Debt</p>
                      </div>
                      <p className="font-medium text-rose-500">$12,500.00</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="font-medium">Credit Cards</p>
                        <p className="text-sm text-muted-foreground">Revolving Debt</p>
                      </div>
                      <p className="font-medium text-rose-500">$3,500.00</p>
                    </div>
                    <div className="flex items-center justify-between border-t pt-4">
                      <p className="font-medium">Total Liabilities</p>
                      <p className="font-bold text-rose-500">$354,500.00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between rounded-lg bg-muted p-4">
                <p className="text-lg font-medium">Net Worth</p>
                <p className="text-2xl font-bold">$464,481.89</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

