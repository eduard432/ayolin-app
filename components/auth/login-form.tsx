/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import * as z from "zod"
import { CardWrapper } from "@/components/auth/card-wrapper"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/schemas"
import { Input } from "../ui/input"
import {
    Form,
    FormControl, 
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "../ui/button"

export const LoginForm = () => {

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    }) 
    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        
    }

    return(
       <CardWrapper
            headerLabel="Bienvenido de vuelta"
            backButtonLabel="Ya tienes una cuenta?"
            backButtonHref="/auth/register"
            showSocial
        >
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"    
            >
                <div className="space-y-4">
                    <FormField 
                        control={form.control}
                        name = "email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="ejem@gmail.com"
                                        type="email"
                                        
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 mb-2"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name = "password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel
                                    className="mt-4"
                                >
                                    Contraseña
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="*********"
                                        type="password"
                                        
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 mb-2"/>
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full mt-4 h-11"
                >
                    Inicia Sesion
                </Button>
            </form>
        </Form>
       </CardWrapper>
    )
}