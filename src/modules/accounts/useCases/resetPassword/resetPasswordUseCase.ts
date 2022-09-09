import { hash } from 'bcrypt';

import { prisma } from '../../../../database/prismaClient';
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  token: string;
  password: string;
}

export class ResetPasswordUseCase {
  async execute({ token, password }: IRequest) {
    const user = await prisma.users.findFirst({
      where: {
        refreshToken: token,
      },
    });

    if (!user || !user.expiresToken) {
      throw new AppError('User not found!');
    }

    const now = new Date();

    if (now > user.expiresToken) {
      throw new AppError('Link expires!');
    }

    const hashPassword = await hash(password, 10);

    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashPassword,
      },
    });
  }
}
