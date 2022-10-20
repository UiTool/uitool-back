import { Request, Response } from 'express';

import { CreateToolUseCase } from './createToolUseCase';

export class CreateToolController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, link, image, categories, tags } = request.body;

    const createToolUseCase = new CreateToolUseCase();

    const tool = await createToolUseCase.execute({
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
