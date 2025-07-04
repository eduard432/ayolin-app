import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      isTwoFactorEnabled?: boolean;
      isOAuth?: boolean;
      isPro?: boolean;
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
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    isTwoFactorEnabled?: boolean;
    isOAuth?: boolean;
    isPro?: boolean;
    name?: string | null;
    email?: string | null;
  }
}
