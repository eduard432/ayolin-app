// Para borrar la base de datos, no se si lo ocupemso despues
// Lo ocupe para migrar de bcrypto -> crypto


import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main(){
    await prisma.account.deleteMany({});
    await prisma.passwordResetToken?.deleteMany?.({});
    await prisma.verificationToken?.deleteMany?.({});
    console.log("Accounts y tokens limpiandos.");
}

main().finally(() => prisma.$disconnect());