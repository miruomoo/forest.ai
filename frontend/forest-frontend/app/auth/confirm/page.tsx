import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function ConfirmPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      // Get the token and type from URL
      const token = searchParams.get("token")
      const type = searchParams.get("type")

      if (token && type) {
        try {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: type as any,
          })

          if (error) {
            setError(error.message)
          } else {
            // Redirect to dashboard on successful confirmation
            router.push("/dashboard")
          }
        } catch (err: any) {
          setError(err.message || "An error occurred during email confirmation")
        }
      } else {
        setError("Missing confirmation parameters")
      }
    }

    handleEmailConfirmation()
  }, [router, searchParams])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border p-8 shadow-sm">
        <h1 className="mb-4 text-2xl font-bold">Email Verification</h1>

        {error ? (
          <div className="rounded-md bg-red-50 p-4 text-red-700">
            <p>Error: {error}</p>
            <p className="mt-2">
              <a href="/login" className="underline">
                Return to login
              </a>
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-4">Verifying your email...</p>
          </div>
        )}
      </div>
    </div>
  )
}
