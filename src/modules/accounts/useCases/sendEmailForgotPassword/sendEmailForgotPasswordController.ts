import { Request, Response } from 'express';

import { SendEmailForgotPasswordUseCase } from './sendEmailForgotPasswordUseCase';

export class SendEmailForgotPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendEmailForgotPasswordUseCase = new SendEmailForgotPasswordUseCase();

    await sendEmailForgotPasswordUseCase.execute({
      email,
    });

    return response.json({ Message: 'Email has been sent!' });
  }
}
