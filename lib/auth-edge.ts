import NextAuth from "next-auth";

/**
 * Edge-safe auth: sin Credentials, sin adapter ni callbacks que toquen DB.
 * Solo necesitamos decodificar el JWT en middleware.
 */
export const { auth } = NextAuth({
  trustHost: true,
  basePath: "/api/v1/auth",
  session: { strategy: "jwt" },
  providers: [],              // nada de credentials aquí
  secret: process.env.AUTH_SECRET,
});