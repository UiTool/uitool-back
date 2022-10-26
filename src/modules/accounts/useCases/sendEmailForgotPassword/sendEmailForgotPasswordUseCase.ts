import { resolve } from 'path';
import { v4 as uuidV4 } from 'uuid';

import { prisma } from '../../../../database/prismaClient';
import { AppError } from '../../../../errors/AppError';
import { NodeMailProvider } from '../../../../providers/nodemailer';

interface IRequest {
  email: string;
}

export class SendEmailForgotPasswordUseCase {
  async execute({ email }: IRequest): Promise<void> {
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError('User not found!');
    }

    const templatePath = resolve(
      __dirname,
      '.',
      'emails',
      'emailForgotPassword.hbs',
    );

    const token = uuidV4();

    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);

    console.log(token, now);

    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: token,
        expiresToken: now,
      },
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    const nodeMailerProvider = new NodeMailProvider();

    await nodeMailerProvider.sendMail(
      email,
      'Recuperação de senha',
      variables,
      templatePath,
    );
  }
}
