import Link from "next/link"
import { DollarSign, ArrowRight, Trees } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2 font-semibold">
          <Trees className="h-6 w-6" />
          <span>ForestAI</span>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:underline">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:underline">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        
        <HeroSection />
        <FeaturesSection />

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Trusted by Investors Everywhere
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what our users are saying about Forest
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 md:gap-8">
              <div className="rounded-lg border p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted"></div>
                  <div>
                    <p className="text-sm font-medium">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Individual Investor</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  "Forest has completely transformed how I manage my investments. The portfolio allocation view gives
                  me insights I never had before."
                </p>
              </div>
              <div className="rounded-lg border p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted"></div>
                  <div>
                    <p className="text-sm font-medium">Michael Chen</p>
                    <p className="text-sm text-muted-foreground">Financial Advisor</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  "I recommend Forest to all my clients. The net worth tracking feature helps them visualize their
                  financial progress over time."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full bg-muted/40 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simple, Transparent Pricing
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that works for you
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 md:gap-8">
              <div className="flex flex-col rounded-lg border shadow-sm">
                <div className="p-6">
                  <h3 className="text-2xl font-bold">Free</h3>
                  <p className="mt-1 text-muted-foreground">Perfect for getting started</p>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-primary"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Basic portfolio tracking
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-primary"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Up to 10 investments
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-primary"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Basic charts and analytics
                    </li>
                  </ul>
                </div>
                <div className="flex flex-1 flex-col justify-end p-6 pt-0">
                  <Link href="/signup">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>
              <div className="relative flex flex-col rounded-lg border shadow-sm">
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Popular
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <p className="mt-1 text-muted-foreground">Advanced features for serious investors</p>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">$9.99</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-primary"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Unlimited investments
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-primary"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Advanced analytics and reporting
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-primary"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Portfolio optimization suggestions
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-primary"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Priority support
                    </li>
                  </ul>
                </div>
                <div className="flex flex-1 flex-col justify-end p-6 pt-0">
                  <Link href="/signup">
                    <Button className="w-full">Upgrade to Pro</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Take Control of Your Finances?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who are already managing their investments with Forest.
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
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <Trees className="h-6 w-6" />
            <span>ForestAI</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} ForestAI. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
