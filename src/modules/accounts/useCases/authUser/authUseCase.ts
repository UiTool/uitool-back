import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import auth from '../../../../configs/auth';
import { prisma } from '../../../../database/prismaClient';
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    email: string;
    name: string;
  };
  token: string;
}

export class AuthUseCase {
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user || !user.password) {
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

    const userResponse = {
      user: {
        email: user.email,
        name: user.name,
      },
      token,
    };

    return userResponse;
  }
}
