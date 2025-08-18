import { db } from "@/lib/db";

export const getChannels = async () => db.channel.findMany()