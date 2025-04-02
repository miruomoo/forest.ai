"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Sample portfolio data - in a real app, this would come from your API
const portfolioData = [
  { symbol: "AAPL", name: "Apple Inc.", value: 12500, allocation: 25 },
  { symbol: "MSFT", name: "Microsoft Corporation", value: 10000, allocation: 20 },
  { symbol: "GOOGL", name: "Alphabet Inc.", value: 7500, allocation: 15 },
  { symbol: "AMZN", name: "Amazon.com Inc.", value: 5000, allocation: 10 },
  { symbol: "TSLA", name: "Tesla Inc.", value: 7500, allocation: 15 },
  { symbol: "NVDA", name: "NVIDIA Corporation", value: 7500, allocation: 15 },
]

// Colors for the pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

export function PortfolioAllocationChart() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-[300px] w-full bg-muted/20 animate-pulse rounded-md" />
  }

  // Format data for the pie chart
  const chartData = portfolioData.map((item, index) => ({
    name: item.symbol,
    value: item.value,
    color: COLORS[index % COLORS.length],
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
          labelLine={false}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

