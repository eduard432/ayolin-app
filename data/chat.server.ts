import { db } from "@/lib/db"
import { Message } from "@prisma/client"

export const getMessagesByChatId = async (id: string): Promise<Message[]> => {
    const chatResult = await db.chat.findUnique({
        where: {
            id
        },
        include: {
            messages: {
                orderBy: { createdAt: 'asc' },
                take: 30
            }
        }
    })
    if (!chatResult) {
        return []
    }
    return chatResult.messages
}


export const getChatById = async (id: string) => {
    const chatResult = await db.chat.findUnique({
        where: {
            id
        },
        include: { messages: true, chatbot: true },
    })
    if (!chatResult) {
        throw new Error("Chat not found")
    }

    return chatResult
}