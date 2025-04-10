"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Plus, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock stock data - in a real app, this would come from a financial API
const mockStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 182.52, change: 1.25 },
  { symbol: "MSFT", name: "Microsoft Corporation", price: 417.88, change: -0.52 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 172.63, change: 0.87 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 185.07, change: 2.13 },
  { symbol: "META", name: "Meta Platforms Inc.", price: 474.99, change: 1.56 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 175.34, change: -2.45 },
  { symbol: "NVDA", name: "NVIDIA Corporation", price: 950.02, change: 5.23 },
  { symbol: "BRK.B", name: "Berkshire Hathaway Inc.", price: 412.56, change: 0.32 },
]

// Colors for the pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#A4DE6C", "#D0ED57"]

type PortfolioItem = {
  symbol: string
  name: string
  price: number
  shares: number
  value: number
  allocation: number
}

export function PortfolioManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof mockStocks>([])
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
  const [sharesInput, setSharesInput] = useState<{ [key: string]: number }>({})
  const [showResults, setShowResults] = useState(false)

  // Calculate total portfolio value
  const totalPortfolioValue = portfolio.reduce((sum, item) => sum + item.value, 0)

  // Search for stocks
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length > 0) {
      const results = mockStocks.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
          stock.name.toLowerCase().includes(query.toLowerCase()),
      )
      setSearchResults(results)
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }

  // Add stock to portfolio
  const addToPortfolio = (stock: (typeof mockStocks)[0]) => {
    const shares = sharesInput[stock.symbol] || 0
    if (shares <= 0) return

    const value = stock.price * shares

    // Check if stock already exists in portfolio
    const existingIndex = portfolio.findIndex((item) => item.symbol === stock.symbol)

    if (existingIndex >= 0) {
      // Update existing stock
      const updatedPortfolio = [...portfolio]
      const existingItem = updatedPortfolio[existingIndex]
      const newShares = existingItem.shares + shares
      const newValue = stock.price * newShares

      updatedPortfolio[existingIndex] = {
        ...existingItem,
        shares: newShares,
        value: newValue,
      }

      // Recalculate allocations
      const newTotal = updatedPortfolio.reduce((sum, item) => sum + item.value, 0)
      updatedPortfolio.forEach((item) => {
        item.allocation = (item.value / newTotal) * 100
      })

      setPortfolio(updatedPortfolio)
    } else {
      // Add new stock
      const newItem = {
        symbol: stock.symbol,
        name: stock.name,
        price: stock.price,
        shares,
        value,
        allocation: 0, // Will be calculated below
      }

      const newPortfolio = [...portfolio, newItem]
      const newTotal = newPortfolio.reduce((sum, item) => sum + item.value, 0)

      // Calculate allocation percentages
      newPortfolio.forEach((item) => {
        item.allocation = (item.value / newTotal) * 100
      })

      setPortfolio(newPortfolio)
    }

    // Reset input
    setSharesInput({ ...sharesInput, [stock.symbol]: 0 })
    setSearchQuery("")
    setSearchResults([])
    setShowResults(false)
  }

  // Remove stock from portfolio
  const removeFromPortfolio = (symbol: string) => {
    const newPortfolio = portfolio.filter((item) => item.symbol !== symbol)

    // Recalculate allocations if there are items left
    if (newPortfolio.length > 0) {
      const newTotal = newPortfolio.reduce((sum, item) => sum + item.value, 0)
      newPortfolio.forEach((item) => {
        item.allocation = (item.value / newTotal) * 100
      })
    }

    setPortfolio(newPortfolio)
  }

  // Prepare data for pie chart
  const chartData = portfolio.map((item, index) => ({
    name: item.symbol,
    value: item.value,
    color: COLORS[index % COLORS.length],
  }))

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Add to Portfolio</CardTitle>
          <CardDescription>Search for stocks to add to your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by ticker or company name..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>

            {showResults && searchResults.length > 0 && (
              <Card className="absolute z-10 mt-1 w-full">
                <CardContent className="p-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Shares</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searchResults.map((stock) => (
                        <TableRow key={stock.symbol}>
                          <TableCell className="font-medium">{stock.symbol}</TableCell>
                          <TableCell>{stock.name}</TableCell>
                          <TableCell>${stock.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min="1"
                              className="w-20"
                              value={sharesInput[stock.symbol] || ""}
                              onChange={(e) =>
                                setSharesInput({
                                  ...sharesInput,
                                  [stock.symbol]: Number.parseInt(e.target.value) || 0,
                                })
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              onClick={() => addToPortfolio(stock)}
                              disabled={!sharesInput[stock.symbol] || sharesInput[stock.symbol] <= 0}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Portfolio Allocation</CardTitle>
          <CardDescription>Total Value: ${totalPortfolioValue.toFixed(2)}</CardDescription>
        </CardHeader>
        <CardContent>
          {portfolio.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Shares</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Allocation</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {portfolio.map((item) => (
                      <TableRow key={item.symbol}>
                        <TableCell className="font-medium">
                          <div>
                            {item.symbol}
                            <div className="text-xs text-muted-foreground">{item.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{item.shares}</TableCell>
                        <TableCell>${item.value.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.allocation.toFixed(1)}%</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => removeFromPortfolio(item.symbol)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-center">
                {portfolio.length > 0 && (
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                        labelLine={false}
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center text-muted-foreground">
              No stocks in portfolio. Search and add stocks above.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

