"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
<section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Your Personal Financial Advisor
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Track your investments, monitor your net worth, and make informed financial decisions with our
                    comprehensive dashboard.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="gap-1.5">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline">
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-muted md:h-[450px]">
                  <img
                    src="/placeholder.svg?height=450&width=800"
                    alt="Dashboard Preview"
                    className="object-cover"
                    style={{ position: "absolute", height: "100%", width: "100%", inset: "0px", color: "transparent" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
  )
}
