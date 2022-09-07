import { Request, Response } from 'express';

import { AuthUseCase } from './authUseCase';

export class AuthController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authUseCase = new AuthUseCase();

    const token = await authUseCase.execute({
      email,
      password,
    });

    return response.json(token);
  }
}
