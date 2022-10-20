import { Request, Response } from 'express';

import { UpdateQuestionUseCase } from './updateQuestionUseCase';

export class UpdateQuestionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { answers, question } = request.body;

    const updateQuestionUseCase = new UpdateQuestionUseCase();

    const NewQuestion = await updateQuestionUseCase.execute({
      id,
      answers,
      question,
    });

    return response.status(201).json({ NewQuestion });
  }
}
