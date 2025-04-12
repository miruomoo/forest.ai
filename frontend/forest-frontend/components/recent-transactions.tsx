"use client"

import { ArrowUp, Coffee, CreditCard, Home, ShoppingBag } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data - in a real app, this would come from your API
const transactions = [
  {
    id: "1",
    date: "2023-04-01",
    description: "Amazon",
    amount: -59.99,
    category: "Shopping",
    icon: ShoppingBag,
    status: "completed",
  },
  {
    id: "2",
    date: "2023-04-01",
    description: "Salary",
    amount: 2500.0,
    category: "Income",
    icon: ArrowUp,
    status: "completed",
  },
  {
    id: "3",
    date: "2023-03-31",
    description: "Mortgage",
    amount: -1200.0,
    category: "Housing",
    icon: Home,
    status: "completed",
  },
  {
    id: "4",
    date: "2023-03-30",
    description: "Starbucks",
    amount: -4.5,
    category: "Food & Drink",
    icon: Coffee,
    status: "completed",
  },
  {
    id: "5",
    date: "2023-03-28",
    description: "Netflix",
    amount: -14.99,
    category: "Subscription",
    icon: CreditCard,
    status: "pending",
  },
]

export function RecentTransactions() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="font-medium">{transaction.date}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-muted">
                    <transaction.icon className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                {transaction.description}
              </div>
            </TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell className={transaction.amount > 0 ? "text-emerald-500" : "text-rose-500"}>
              {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
            </TableCell>
            <TableCell>
              <Badge variant={transaction.status === "completed" ? "outline" : "secondary"}>{transaction.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

