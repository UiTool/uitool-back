import { Request, Response } from 'express';

import { UpdateToolUseCase } from './updateToolUseCase';

export class UpdateToolController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description, link, image, categories, tags } = request.body;

    const updateToolUseCase = new UpdateToolUseCase();

    const tool = await updateToolUseCase.execute({
      id,
      name,
      description,
      link,
      image,
      categories,
      tags,
    });

    return response.status(201).json({ tool });
  }
}
