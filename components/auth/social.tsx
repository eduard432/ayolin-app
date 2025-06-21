"use client"

import {FcGoogle} from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { Button } from "@/referencia/ui/button"

export const Social = () => {
    return(
        <div className="flex items-center gap-x-2">
            <Button
                size="lg"
                className="w-[155px] items-center"
                variant="outline"
                onClick={ () => {}}
            >
                <FcGoogle className="h-5 w-5"/>
            </Button>
            <Button
                size="lg"
                className="w-[155px] justify-center"
                variant="outline"
                onClick={ () => {}}
            >
                <FaGithub className="h-5 w-5"/>
            </Button>
        </div>
    )
}