import { db } from "@/lib/db"
import { Message,  } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

export const saveMessages = async (messages: Message[]) => {
    await db.message.createMany({
        //@ts-expect-error Valid types
        data: messages 
    })
}

export const getMessages = async (chatId: string) => {
    const res = await fetch(`/api/v1/chat/${chatId}/messages`)
    const data: { messages: Message[] } = await res.json()

    if(!data.messages) {
        throw new Error("Messages not found")
    } 

    return data.messages
}

export const useMessages = (chatId: string) => {
    return useQuery({
        queryKey: ["messages", chatId],
        queryFn: () => getMessages(chatId),
        refetchOnWindowFocus: false,
        enabled: !!chatId
    })
}