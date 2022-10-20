import { Request, Response } from 'express';

import { DeleteToolUseCase } from './deleteToolUseCase';

export class DeleteToolController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteToolUseCase = new DeleteToolUseCase();

    const tool = await deleteToolUseCase.execute({
      id,
    });

    return response.status(201).json({ tool });
  }
}
