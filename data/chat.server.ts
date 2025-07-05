import { db } from "@/lib/db"
import { Message } from "@prisma/client"

export const getMessagesByChatId = async (id: string): Promise<Message[]> => {
    const chatbotResult = await db.chat.findUnique({
        where: {
            id
        },
        select: {
            messages: true
        }
    })
    if (!chatbotResult) {
        throw new Error("Chat not found")
    }
    return chatbotResult.messages
}
