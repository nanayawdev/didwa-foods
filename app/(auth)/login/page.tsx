import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login - Didwa Foods",
  description: "Login to your Didwa Foods account",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-6">
        <div>
          <h2 className="text-center text-3xl font-extrabold">
            Sign in to your account
          </h2>
        </div>
        {/* Auth component will be added here */}
      </div>
    </div>
  )
} 