/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { cn } from "@/lib/utils"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {useForm, SubmitHandler} from "react-hook-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoginSchema } from "@/schemas"
import Link from "next/link"
import {zodResolver} from "@hookform/resolvers/zod"



export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema), 
    defaultValues: {
      email: "",
      password: "",
    }
  });
  
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Inicia sesión en tu cuenta</CardTitle>
          <CardDescription>
            Ingresa tu correo electrónico para iniciar sesión en tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form  >
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nom@ejemplo.com"
                  
                />
                
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Olvidaste tu contraseña?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  
                />
                
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login con GitHub
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              No tienes cuenta?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Registrarse
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
