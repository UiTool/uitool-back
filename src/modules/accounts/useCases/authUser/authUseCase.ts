import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import auth from '../../../../config/auth';
import { prisma } from '../../../../database/prismaClient';
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

export class AuthUseCase {
  async execute({ email, password }: IRequest) {
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError('Email ou Password is incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email ou Password is incorrect');
    }

    const token = sign({ email }, auth.secret_token, {
      subject: user?.id,
      expiresIn: '1d',
    });

    return token;
  }
}
