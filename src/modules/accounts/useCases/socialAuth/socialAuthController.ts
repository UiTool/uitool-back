import { Request, Response } from 'express';

import { SocialAuthUseCase } from './socialAuthUseCase';

export class SocialAuthController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const socialAuthUseCase = new SocialAuthUseCase();

    const token = await socialAuthUseCase.execute({
      name,
      email,
    });

    console.log(token);
    return response.json(token);
  }
}
