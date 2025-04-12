"use client"

import { BanknoteIcon as Bank, CreditCard, LineChart } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

// Sample data - in a real app, this would come from your API
const accounts = [
  {
    id: "1",
    name: "Checking Account",
    balance: 5240.5,
    type: "bank",
    icon: Bank,
  },
  {
    id: "2",
    name: "Savings Account",
    balance: 12750.0,
    type: "bank",
    icon: Bank,
  },
  {
    id: "3",
    name: "Credit Card",
    balance: -1240.5,
    type: "credit",
    icon: CreditCard,
  },
  {
    id: "4",
    name: "Investment Portfolio",
    balance: 28500.0,
    type: "investment",
    icon: LineChart,
  },
]

export function AccountsCard() {
  const totalAssets = accounts.reduce((sum, account) => sum + (account.balance > 0 ? account.balance : 0), 0)

  return (
    <div className="space-y-4">
      {accounts.map((account) => (
        <div key={account.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-muted">
                <account.icon className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{account.name}</div>
              <div className="text-xs text-muted-foreground">{account.type}</div>
            </div>
          </div>
          <div className="text-right">
            <div className={account.balance < 0 ? "text-rose-500" : ""}>
              $
              {Math.abs(account.balance).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            {account.balance > 0 && (
              <div className="mt-1 w-24">
                <Progress value={(account.balance / totalAssets) * 100} className="h-1" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

