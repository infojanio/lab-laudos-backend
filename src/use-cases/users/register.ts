import { UsersRepository } from "@/repositories/prisma/Iprisma/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../../utils/messages/errors/user-already-exists-error";
import { Role, User } from "@prisma/client";

interface RegisterUseCaseRequest {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
  role: Role;
  cpf?: string;
  storeId?: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    phone,
    avatar,
    role,
    cpf,
    storeId,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const passwordHash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
      phone,
      avatar,
      cpf,
      role,
      storeId,
    });

    return { user };
  }
}
