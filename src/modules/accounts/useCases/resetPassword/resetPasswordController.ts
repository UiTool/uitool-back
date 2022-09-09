import { Request, Response } from 'express';

import { ResetPasswordUseCase } from './resetPasswordUseCase';

export class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPasswordUseCase = new ResetPasswordUseCase();

    await resetPasswordUseCase.execute({
      token,
      password,
    });

    return response.json('Update Password with Sucess!');
  }
}
