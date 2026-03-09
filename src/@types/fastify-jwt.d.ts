import "@fastify/jwt";
import { Role } from "@prisma/client";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      sub: string;
      role: "ADMIN" | "USER" | "SUPER_ADMIN";
      storeId?: string;
    };
    user: {
      sub: string;
      role: "ADMIN" | "USER" | "SUPER_ADMIN";
      storeId?: string;
    };
  }
}
