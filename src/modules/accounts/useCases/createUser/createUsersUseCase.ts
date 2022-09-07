import { AppError } from '@errors/AppError';
import { hash } from 'bcrypt';
import { prisma } from 'database/prismaClient';

interface IRequest {
  email: string;
  name: string;
  password: string;
}

export class CreateUsersUseCase {
  async execute({ name, email, password }: IRequest) {
    const userExist = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (userExist) {
      throw new AppError('User already exists');
    }

    const hashPassword = await hash(password, 10);

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    return user;
  }
}
