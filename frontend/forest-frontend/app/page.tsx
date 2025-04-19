import { DollarSign, Edit, TrendingUp } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PortfolioAllocationChart } from "../components/portfolio-allocation-chart"
import { StockListings } from "../components/stock-listings"
import { PortfolioAnalysis } from "../components/portfolio-analysis"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="#" className="flex items-center gap-2 font-semibold">
          <DollarSign className="h-6 w-6" />
          <span>Finance Dashboard</span>
        </Link>
        <nav className="ml-auto flex items-center gap-2">
          <Link href="/portfolio">
            <Button variant="outline" size="sm">
              Portfolio
            </Button>
          </Link>
          <Button variant="outline" size="sm">
            Settings
          </Button>
          <ThemeToggle />
          <Button size="sm">Upgrade</Button>
        </nav>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Link href="/net-worth" className="block">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$287,492.50</div>
                <p className="text-xs text-muted-foreground">+5.3% from last quarter</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/movement" className="block">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Movement</CardTitle>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline text-2xl font-bold text-emerald-500">
                  +3.2%
                  <span className="ml-1 text-sm font-normal text-muted-foreground">this week</span>
                </div>
                <p className="text-xs text-muted-foreground">Outperforming S&P 500 by 1.7%</p>
              </CardContent>
            </Card>
          </Link>
        </div>
        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Portfolio Allocation</CardTitle>
                <CardDescription>Your investment portfolio breakdown</CardDescription>
              </div>
              <Link href="/portfolio">
                <Button size="sm" variant="outline" className="gap-1">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="pl-2">
              <PortfolioAllocationChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Analysis</CardTitle>
              <CardDescription>Insights and recent movements</CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioAnalysis />
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-7">
            <CardHeader>
              <CardTitle>Stock Portfolio</CardTitle>
              <CardDescription>Your stock holdings and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <StockListings />
            </CardContent>
            <CardFooter>
              <Link href="/portfolio">
                <Button size="sm" variant="outline" className="ml-auto">
                  Manage Portfolio
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
