import { Request, Response } from 'express';

import { GetAllToolsUseCase } from './getAllToolsUseCase';

export class GetAllToolsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getAllToolsUseCase = new GetAllToolsUseCase();

    const tools = await getAllToolsUseCase.execute();

    return response.json(tools);
  }
}
