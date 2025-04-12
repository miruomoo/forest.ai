"use client"

import { ArrowDown, ArrowUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data - in a real app, this would come from your API
const stocks = [
  {
    id: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 182.52,
    change: 1.25,
    changePercent: 0.69,
    shares: 68.5,
    value: 12502.62,
  },
  {
    id: "2",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 417.88,
    change: -0.52,
    changePercent: -0.12,
    shares: 23.9,
    value: 9987.33,
  },
  {
    id: "3",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 172.63,
    change: 0.87,
    changePercent: 0.51,
    shares: 43.4,
    value: 7492.14,
  },
  {
    id: "4",
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 185.07,
    change: 2.13,
    changePercent: 1.16,
    shares: 27.0,
    value: 4996.89,
  },
  {
    id: "5",
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 175.34,
    change: -2.45,
    changePercent: -1.38,
    shares: 42.8,
    value: 7504.55,
  },
  {
    id: "6",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 950.02,
    change: 5.23,
    changePercent: 0.55,
    shares: 7.9,
    value: 7505.16,
  },
]

export function StockListings() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Symbol</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Change</TableHead>
          <TableHead>Shares</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stocks.map((stock) => (
          <TableRow key={stock.id}>
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium">{stock.symbol}</span>
                <span className="text-xs text-muted-foreground">{stock.name}</span>
              </div>
            </TableCell>
            <TableCell>${stock.price.toFixed(2)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                {stock.change > 0 ? (
                  <ArrowUp className="h-4 w-4 text-emerald-500" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-rose-500" />
                )}
                <span className={stock.change > 0 ? "text-emerald-500" : "text-rose-500"}>
                  {stock.change > 0 ? "+" : ""}
                  {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </span>
              </div>
            </TableCell>
            <TableCell>{stock.shares.toFixed(1)}</TableCell>
            <TableCell className="font-medium">${stock.value.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

