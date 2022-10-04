import { sign } from 'jsonwebtoken';

import auth from '../../../../configs/auth';
import { prisma } from '../../../../database/prismaClient';

interface IRequest {
  name: string;
  email: string;
}

interface IResponse {
  token: string;
}

export class SocialAuthUseCase {
  async execute({ name, email }: IRequest): Promise<IResponse> {
    let user = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      user = await prisma.users.create({
        data: {
          name,
          email,
        },
      });
    }

    const token = sign({ email }, auth.secret_token, {
      subject: user?.id,
      expiresIn: '1d',
    });

    return { token };
  }
}
