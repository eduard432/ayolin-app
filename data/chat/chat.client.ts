import { db } from "@/lib/db"
import { Chat, Message, Prisma } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

export const saveMessages = async (messages: Prisma.MessageCreateManyInput[]) => {
    await db.message.createMany({
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

export const getChats = async (chatbotId: string) => {
    const res = await fetch(`/api/v1/chatbot/${chatbotId}/chats`)
    const data: { chats: Chat[] } = await res.json()

    if(!data.chats) {
        throw new Error('Chats not found')
    }

    return data.chats
}

export const useChats = (chatbotId: string) => {
	return useQuery({
        queryKey: ["chats", chatbotId],
        queryFn: () => getChats(chatbotId),
        refetchOnWindowFocus: false,
        enabled: !!chatbotId
    })
}