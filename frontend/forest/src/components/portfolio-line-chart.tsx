"use client"

import { useState, useEffect } from "react"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine 
} from "recharts"
import { format as formatDate } from "date-fns"

import { Card } from "@/components/ui/card"

// Generate sample data for different time frames
const generateData = (timeFrame: string) => {
  const now = new Date()
  const data = []
  
  let days = 0
  let interval = ""
  let dateFormat = ""
  let startValue = 0
  let volatility = 0
  
  switch(timeFrame) {
    case "1D":
      days = 1
      interval = "hour"
      dateFormat = "ha"
      startValue = 49800
      volatility = 0.001
      break
    case "1W":
      days = 7
      interval = "day"
      dateFormat = "EEE"
      startValue = 49500
      volatility = 0.005
      break
    case "1M":
      days = 30
      interval = "day"
      dateFormat = "d MMM"
      startValue = 48000
      volatility = 0.01
      break
    case "3M":
      days = 90
      interval = "week"
      dateFormat = "d MMM"
      startValue = 46000
      volatility = 0.02
      break
    case "1Y":
      days = 365
      interval = "month"
      dateFormat = "MMM yyyy"
      startValue = 42000
      volatility = 0.04
      break
    case "ALL":
      days = 1825 // 5 years
      interval = "year"
      dateFormat = "yyyy"
      startValue = 30000
      volatility = 0.08
      break
    default:
      days = 30
      interval = "day"
      dateFormat = "d MMM"
      startValue = 48000
      volatility = 0.01
  }
  
  let points = 0
  if (interval === "hour") points = 24
  else if (interval === "day") points = days
  else if (interval === "week") points = Math.ceil(days / 7)
  else if (interval === "month") points = Math.ceil(days / 30)
  else if (interval === "year") points = Math.ceil(days / 365)
  
  let value = startValue
  const trend = 0.2 // Positive trend
  
  for (let i = 0; i < points; i++) {
    const date = new Date()
    
    if (interval === "hour") {
      date.setHours(date.getHours() - (points - i - 1))
    } else if (interval === "day") {
      date.setDate(date.getDate() - (points - i - 1))
    } else if (interval === "week") {
      date.setDate(date.getDate() - (points - i - 1) * 7)
    } else if (interval === "month") {
      date.setMonth(date.getMonth() - (points - i - 1))
    } else if (interval === "year") {
      date.setFullYear(date.getFullYear() - (points - i - 1))
    }
    
    // Add some randomness but with an overall positive trend
    const change = value * (Math.random() * volatility * 2 - volatility + trend / points)
    value += change
    
    data.push({
      date,
      value: Math.round(value * 100) / 100,
      formattedDate: dateFormat ? formatDate(date, dateFormat) : date.toLocaleDateString()
    })
  }
  
  return data
}

interface PortfolioLineChartProps {
  timeFrame: string
  title: string
  valuePrefix?: string
  showReferenceLine?: boolean
}

export function PortfolioLineChart({ 
  timeFrame, 
  title, 
  valuePrefix = "$",
  showReferenceLine = false
}: PortfolioLineChartProps) {
  const [data, setData] = useState<any[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setData(generateData(timeFrame))
  }, [timeFrame])

  if (!isMounted) {
    return <div className="h-[400px] w-full bg-muted/20 animate-pulse rounded-md" />
  }

  // Calculate percentage change
  const firstValue = data[0]?.value || 0
  const lastValue = data[data.length - 1]?.value || 0
  const percentChange = firstValue ? ((lastValue - firstValue) / firstValue) * 100 : 0
  const isPositive = percentChange >= 0

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card className="p-3 shadow-sm">
          <p className="font-medium">{payload[0].payload.formattedDate}</p>
          <p className="text-sm">
            {valuePrefix}{payload[0].value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </Card>
      )
    }
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className={isPositive ? "text-emerald-500" : "text-rose-500"}>
          {isPositive ? "+" : ""}{percentChange.toFixed(2)}%
        </div>
      </div>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="formattedDate" 
              className="text-xs" 
            />
            <YAxis 
              className="text-xs"
              tickFormatter={(value) => `${valuePrefix}${value.toLocaleString(undefined, { 
                notation: 'compact',
                compactDisplay: 'short'
              })}`}
            />
            <Tooltip content={<CustomTooltip />} />
            {showReferenceLine && (
              <ReferenceLine 
                y={firstValue} 
                stroke="#888" 
                strokeDasharray="3 3" 
                label={{ 
                  value: `${valuePrefix}${firstValue.toLocaleString(undefined, { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}`, 
                  position: 'left',
                  className: 'text-xs fill-muted-foreground'
                }} 
              />
            )}
            <Line
              type="monotone"
              dataKey="value"
              stroke={isPositive ? "#10b981" : "#f43f5e"}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

