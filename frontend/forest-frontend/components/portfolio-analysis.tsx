"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp, TrendingUp, AlertTriangle, Info, Award, BarChart3 } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function PortfolioAnalysis() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-full w-full bg-muted/20 animate-pulse rounded-md" />
  }

  return (
    <div className="space-y-4">
      {/* Performance Summary */}
      <div className="flex items-start space-x-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300">
          <TrendingUp className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-medium">Portfolio Performance</h3>
          <p className="text-sm text-muted-foreground">
            Your portfolio is up <span className="font-medium text-emerald-600 dark:text-emerald-400">3.2%</span> this
            week, outperforming the S&P 500 by 1.7%.
          </p>
        </div>
      </div>

      <Separator />

      {/* Key Movers */}
      <div>
        <h3 className="mb-2 font-medium">Key Movers</h3>
        <div className="grid gap-2">
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-500 hover:bg-emerald-600">
                    <ArrowUp className="mr-1 h-3 w-3" />
                    Top Gainer
                  </Badge>
                  <span className="font-medium">NVDA</span>
                </div>
                <div className="text-emerald-600 dark:text-emerald-400">+5.23%</div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                NVIDIA surged after announcing new AI chips and partnerships with major tech companies.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">
                    <ArrowDown className="mr-1 h-3 w-3" />
                    Top Decliner
                  </Badge>
                  <span className="font-medium">TSLA</span>
                </div>
                <div className="text-rose-600 dark:text-rose-400">-2.45%</div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Tesla declined following production delays and increased competition in the EV market.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Insights */}
      <div>
        <h3 className="mb-2 font-medium">Portfolio Insights</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="mt-0.5 text-amber-500">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <p className="text-sm">
              <span className="font-medium">Sector Concentration:</span> 68% of your portfolio is in Technology.
              Consider diversifying into other sectors.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <div className="mt-0.5 text-sky-500">
              <Info className="h-4 w-4" />
            </div>
            <p className="text-sm">
              <span className="font-medium">Dividend Yield:</span> Your portfolio's dividend yield is 1.2%, below the
              S&P 500 average of 1.8%.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <div className="mt-0.5 text-emerald-500">
              <Award className="h-4 w-4" />
            </div>
            <p className="text-sm">
              <span className="font-medium">Top Performer:</span> NVDA has returned 112% since you purchased it, making
              it your best investment.
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <div className="mt-0.5 text-purple-500">
              <BarChart3 className="h-4 w-4" />
            </div>
            <p className="text-sm">
              <span className="font-medium">Volatility:</span> Your portfolio volatility is moderate with a beta of 1.2
              relative to the market.
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Recent News Impact */}
      <div>
        <h3 className="mb-2 font-medium">Recent News Impact</h3>
        <p className="text-sm text-muted-foreground">
          The Fed's recent interest rate decision has positively impacted your financial stocks. Tech stocks may face
          pressure from new regulatory proposals, but your positions in AAPL and MSFT should remain resilient due to
          their strong balance sheets.
        </p>
      </div>

      <Separator />

      {/* Recommendations */}
      <div>
        <h3 className="mb-2 font-medium">Recommendations</h3>
        <ul className="space-y-1 text-sm">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Consider taking some profits from NVDA after its recent strong performance.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              Add exposure to defensive sectors like healthcare and consumer staples to balance your tech-heavy
              portfolio.
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Review your TSLA position as the stock faces increased competitive pressures.</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

