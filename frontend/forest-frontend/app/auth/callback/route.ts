import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  // Log for debugging
  console.log("Auth callback received with code:", code ? "Code present" : "No code")

  if (code) {
    try {
      const cookieStore = cookies()
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

      // Exchange the code for a session
      const { error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error("Error exchanging code for session:", error.message)
        // Redirect to login with error
        return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error.message)}`, request.url))
      }

      // Successful verification, redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url))
    } catch (error) {
      console.error("Unexpected error in auth callback:", error)
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent("An unexpected error occurred")}`, request.url),
      )
    }
  }

  // If no code is present, redirect to home page
  return NextResponse.redirect(new URL("/", request.url))
}
