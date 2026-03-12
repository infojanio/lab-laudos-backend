import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import {
  UsersRepository,
  AuthUserDB,
  UserProfileDB,
} from "@/repositories/prisma/Iprisma/users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async findProfileById(userId: string): Promise<UserProfileDB | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        avatar: true,
        createdAt: true,
        storeId: true,
      },
    });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<AuthUserDB | null> {
    return prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        passwordHash: true,
        role: true,
        storeId: true,
        avatar: true,
      },
    });
  }

  async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  async update(
    userId: string,
    data: Prisma.UserUncheckedUpdateInput,
  ): Promise<User> {
    return prisma.user.update({
      where: { id: userId },
      data,
    });
  }
}
