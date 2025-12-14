import { getUserById } from "@/data/user/user.server";
import { ApiErrorHandler } from "@/lib/api/ApiError";
import { ApiResponse } from "@/lib/api/ApiResponse";
import { getTotalUsage } from "@/lib/api/Chat";
import { User } from "@prisma/client";

export const GET = ApiErrorHandler.wrapAuth(async (_, __, session) => {
    const user = await getUserById(session.user.id) as User;
    const usage = await getTotalUsage(user);

    return ApiResponse.success({ usage });
})