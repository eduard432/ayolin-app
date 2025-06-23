import { db } from "@/lib/db"

export const getChatBotByUserId = async (userId: string) => {
    const chatbots = await db.chatbot.findMany({
        where: {
            userId,
        }
    })

    return chatbots
}