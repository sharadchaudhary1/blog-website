

"use client"

import { signIn } from "next-auth/react"

import { FcGoogle } from "react-icons/fc"


export default function SignIn() {
  const handleLogin = (provider: string) => {
    signIn(provider, { redirectTo: "/" })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center space-y-6">
      
        <p className="text-gray-500 text-sm">
          Sign in to continue to <span className="font-medium text-blue-600">BlogSphere</span>
        </p>

      
        <div className="flex flex-col space-y-4 mt-6">
          <button
            onClick={() => handleLogin("google")}
            className="flex items-center justify-center gap-3 w-full py-2.5 cursor-pointer rounded-lg border border-gray-300 hover:bg-gray-100 transition-all"
          >
            <FcGoogle className="text-xl" />
            <span className="text-gray-700 font-medium">Sign in with Google</span>
          </button>


        </div>

      
      </div>
    </div>
  )
}
