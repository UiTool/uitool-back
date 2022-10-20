import { Request, Response } from 'express';

import { GetToolByIdUseCase } from './getToolByIdUseCase';

export class GetToolByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getToolByIdUseCase = new GetToolByIdUseCase();

    const res = await getToolByIdUseCase.execute({
      id,
    });

    return response.json(res);
  }
}
