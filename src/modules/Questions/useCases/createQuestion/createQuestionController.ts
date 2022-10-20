import { Request, Response } from 'express';

import { CreateQuestionUseCase } from './createQuestionUseCase';

export class CreateQuestionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { question, answers } = request.body;

    const createQuestionUseCase = new CreateQuestionUseCase();

    const newQuestion = await createQuestionUseCase.execute({
      question,
      answers,
    });

    return response.status(201).json({ newQuestion });
  }
}
