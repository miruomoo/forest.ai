"use client"

import React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

type TimeFrame = "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL"

interface TimeFrameSelectorProps {
  onTimeFrameChange: (timeFrame: TimeFrame) => void
  defaultTimeFrame?: TimeFrame
}

export function TimeFrameSelector({ onTimeFrameChange, defaultTimeFrame = "1M" }: TimeFrameSelectorProps) {
  const [activeTimeFrame, setActiveTimeFrame] = useState<TimeFrame>(defaultTimeFrame)

  const handleTimeFrameChange = (timeFrame: TimeFrame) => {
    setActiveTimeFrame(timeFrame)
    onTimeFrameChange(timeFrame)
  }

  return (
    <div className="flex space-x-2">
      {(["1D", "1W", "1M", "3M", "1Y", "ALL"] as TimeFrame[]).map((timeFrame) => (
        <Button
          key={timeFrame}
          variant={activeTimeFrame === timeFrame ? "default" : "outline"}
          size="sm"
          onClick={() => handleTimeFrameChange(timeFrame)}
        >
          {timeFrame}
        </Button>
      ))}
    </div>
  )
}

