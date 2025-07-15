"use client"

import { LoginForm } from "@/components/auth/login-form"
import { SessionProvider } from "next-auth/react"

const LoginPage = () => {
  return(
    <SessionProvider basePath="/api/v1/auth">
      <LoginForm/>
    </SessionProvider>
  )
}

export default LoginPage