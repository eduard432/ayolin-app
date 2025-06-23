/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth"

export async function POST(req: NextRequest){
    try{
        const body = await req.json()
        const validatedFields = LoginSchema.safeParse(body)

        if(!validatedFields.success){
            return NextResponse.json(
                { error: 'Campos Invalidos', details: validatedFields.error.format() },
                { status: 400 }
            )
        }

        const { email, password } = validatedFields.data

        await signIn('credentials', {
            email, 
            password,
        })

        return NextResponse.json({ succes: true})
    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type){
                case 'CredentialsSignin': 
                return NextResponse.json(
                    {error: 'Credenciales Invalidas'},
                    {status: 500}
                )
            }
        }
        return NextResponse.json(
            {error: 'Error del Server', details: error},
            {status: 500}
        )
    }
}