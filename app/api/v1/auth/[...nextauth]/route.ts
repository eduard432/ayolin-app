import * as authModule from "@/auth" // Import everything from auth.ts

// Export GET and POST directly if they exist in authModule
export const GET = authModule.GET;
export const POST = authModule.POST;