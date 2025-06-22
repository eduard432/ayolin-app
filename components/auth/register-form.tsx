/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import * as z from "zod"
import { useState, useTransition } from "react"
import { CardWrapper } from "@/components/auth/card-wrapper"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema } from "@/schemas"
import { Input } from "../ui/input"
import { FormError} from "@/components/form-error"
import { FormSucces } from "@/components/form-succes"
import { register } from "@/actions/register"
import {
    Form,
    FormControl, 
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "../ui/button"

export const RegisterForm = () => {

    const [error, setError] = useState<string | undefined>("")
    const [succes, setSucces] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        }
    }) 
    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("")
        setSucces("")

        startTransition(() => {
            register(values)
            .then((data) => {
                setError(data.error)
                setSucces(data.succes)
            })
        })
    }

    return(
       <CardWrapper
            headerLabel="Crea tu cuenta"
            backButtonLabel="Ya tienes una cuenta?"
            backButtonHref="/auth/login"
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
                        name = "name"
                        render={({field}) => (
                            <FormItem>
                                {/*Quiero hacer que se vea negro siempre, falta checar */}
                                <FormLabel className="text-black">Nombre</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        {...field}
                                        placeholder="Eugenio Dervez"
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 mb-2"/>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name = "email"
                        render={({field}) => (
                            <FormItem>
                                {/*Quiero hacer que se vea negro siempre, falta checar */}
                                <FormLabel className="text-black">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
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
                                <FormLabel>
                                    Contraseña
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
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
                <FormError message={error}/>
                <FormSucces message={succes}/>
                <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full mt-4 h-11"
                >
                    Crea tu cuenta
                </Button>
            </form>
        </Form>
       </CardWrapper>
    )
}