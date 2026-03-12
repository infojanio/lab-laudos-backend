import { z } from "zod"; //responsável pela validação dos dados
import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "@/utils/messages/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/_factories/make-register-use-case";
import isValidCPF from "@/utils/IsValidCPF";

// Definição do enum Role
enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    // id: z.string(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    role: z.nativeEnum(Role), // 🔹 Agora valida apenas os valores do enum
    avatar: z.string(),
    cpf: z.string().refine(isValidCPF, {
      message: "CPF inválido",
    }),

    storeId: z.string().optional(),
  });

  const {
    //id,
    name,
    email,
    password,
    phone,
    role,
    avatar,
    storeId,
    cpf,
  } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    const { user } = await registerUseCase.execute({
      //id,
      name,
      email,
      password,
      phone,
      cpf,
      role,
      avatar,
      storeId,
    });

    // Retorna status 201, mensagem de sucesso e os dados do usuário criado
    return reply.status(201).send({
      message: "Cadastro realizado com sucesso!",
      user: {
        ...user,
        passwordHash: undefined,
      },
    });
  } catch (error) {
    console.error("REGISTER USER ERROR:");
    console.error(error);
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }
    return reply.status(500).send({ message: "Erro interno no servidor" });
  }
}
