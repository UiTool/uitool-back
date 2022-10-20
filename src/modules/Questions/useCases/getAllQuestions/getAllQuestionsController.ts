import { Request, Response } from 'express';

import { GetAllQuestionsUseCase } from './getAllQuestionsUseCase';

export class GetAllQuestionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getAllQuestionsUseCase = new GetAllQuestionsUseCase();

    const questions = await getAllQuestionsUseCase.execute();

    return response.json(questions);
  }
}
