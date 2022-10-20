import { Request, Response } from 'express';

import { GetQuestionByIdUseCase } from './getQuestionByIdUseCase';

export class GetQuestionByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getQuestionByIdUseCase = new GetQuestionByIdUseCase();

    const res = await getQuestionByIdUseCase.execute({
      id,
    });

    return response.json(res);
  }
}
