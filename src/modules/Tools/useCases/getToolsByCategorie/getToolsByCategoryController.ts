import { Request, Response } from 'express';

import { GetToolsByCategoryUseCase } from './getToolsByCategoryUseCase';

export class GetToolsByCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category } = request.params;

    const getToolsByCategoryUseCase = new GetToolsByCategoryUseCase();

    const res = await getToolsByCategoryUseCase.execute({
      category,
    });

    return response.json(res);
  }
}
