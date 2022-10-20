import { Request, Response } from 'express';

import { DeleteQuestionUseCase } from './deleteQuestionUseCase';

export class DeleteQuestionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteQuestionUseCase = new DeleteQuestionUseCase();

    const question = await deleteQuestionUseCase.execute({
      id,
    });

    return response.status(201).json({ question });
  }
}
