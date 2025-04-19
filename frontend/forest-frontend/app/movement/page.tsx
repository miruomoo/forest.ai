"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TimeFrameSelector } from "../../components/time-frame-selector"
import { PortfolioLineChart } from "../../components/portfolio-line-chart"
import { ThemeToggle } from "@/components/theme-toggle"

export default function MovementPage() {
  const [timeFrame, setTimeFrame] = useState("1W")

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Portfolio Movement</h1>
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
                  <CardTitle>Portfolio Performance</CardTitle>
                  <CardDescription>Track your portfolio's performance over time</CardDescription>
                </div>
                <TimeFrameSelector onTimeFrameChange={(tf) => setTimeFrame(tf)} defaultTimeFrame="1W" />
              </div>
            </CardHeader>
            <CardContent>
              <PortfolioLineChart timeFrame={timeFrame} title="Portfolio Value" showReferenceLine={true} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key performance indicators for your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Annualized Return</p>
                  <p className="text-2xl font-bold text-emerald-500">+12.4%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Volatility</p>
                  <p className="text-2xl font-bold">18.7%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
                  <p className="text-2xl font-bold">1.32</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Max Drawdown</p>
                  <p className="text-2xl font-bold text-rose-500">-8.5%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

