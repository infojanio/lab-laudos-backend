import { Prisma, Role, User } from "@prisma/client";

/**
 * Perfil público do usuário
 */
export type UserProfileDB = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: Role;
  avatar: string | null;
  createdAt: Date;
  storeId: string | null;
};

/**
 * Retorno para autenticação
 */
export type AuthUserDB = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  storeId: string | null;
  avatar: string | null;
};

export interface UsersRepository {
  findProfileById(userId: string): Promise<UserProfileDB | null>;

  findById(id: string): Promise<User | null>;

  /**
   * 🔐 usado no login
   */
  findByEmail(email: string): Promise<AuthUserDB | null>;

  /**
   * criação de usuário
   */
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>;

  /**
   * update
   */
  update(userId: string, data: Prisma.UserUncheckedUpdateInput): Promise<User>;
}
