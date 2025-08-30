"use client"

import * as z from "zod"
import { useState, useTransition } from "react"
import { CardWrapper } from "@/components/auth/card-wrapper"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema } from "@/schemas"
import { Input } from "../ui/input"
import { FormError} from "@/components/ui/FormError"
import { FormSucces } from "@/components/ui/FormSuccess"
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
            password2: ""
        }
    }) 
    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("")
        setSucces("")

        startTransition(() => {
            register(values)
            .then((data) => {
                setError(data.error)
                setSucces(data.success)
            })
        })
    }

    return(
       <CardWrapper
            headerLabel="Crea tu cuenta"
            backButtonLabel="¿Ya tienes una cuenta?"
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
                                <FormLabel className="text-white">Nombre</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        {...field}
                                        placeholder="Nombre"
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
                                <FormLabel className="text-white">Correo electrónico</FormLabel>
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
                                        type="password"
                                        
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 mb-2"/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name = "password2"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>
                                    Confirmar contraseña 
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isPending}
                                        {...field}
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
                    variant="secondary"
                    className="
                        w-full bg-white text-black
                        hover:!bg-white active:!bg-white
                        dark:hover:!bg-white dark:active:!bg-white
                        transition-none
                    "
                >
                    Crear cuenta
                </Button>
            </form>
        </Form>
       </CardWrapper>
    )
}