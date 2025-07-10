import { db } from "@/lib/db";
import { ToolFunction } from "@prisma/client";

export const getToolFunctionByKeyName = async (keyName: string): Promise<ToolFunction | null> => {
    const toolFunction = await db.toolFunction.findFirst({
        where: {
            keyName
        }
    })

    return toolFunction
}