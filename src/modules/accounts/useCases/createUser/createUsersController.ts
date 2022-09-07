import { Request, Response } from 'express';

import { CreateUsersUseCase } from './createUsersUseCase';

export class CreateUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUsersUseCase = new CreateUsersUseCase();

    const user = await createUsersUseCase.execute({
      name,
      email,
      password,
    });
    return response.json(user);
  }
}
