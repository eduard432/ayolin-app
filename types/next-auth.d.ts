import { UserRole } from "@prisma/client";
import "next-auth";
import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      isTwoFactorEnabled?: boolean;
      isOAuth?: boolean;
      isPro?: boolean;
      avatarColor?: string | null;
      avatarSeed?: string | null;
      avatarNoBg?: boolean;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    role: UserRole;
    isTwoFactorEnabled?: boolean;
    isPro?: boolean;
    avatarColor?: string | null;
    avatarSeed?: string | null;
    avatarNoBg?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: UserRole;
    isTwoFactorEnabled?: boolean;
    isOAuth?: boolean;
    isPro?: boolean;
    avatarColor?: string | null;
    avatarSeed?: string | null;
    avatarNoBg?: boolean;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}
