import { Tools } from '@prisma/client';

import { prisma } from '../../../../database/prismaClient';
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  id: string;
}

export class GetToolByIdUseCase {
  async execute({ id }: IRequest): Promise<Tools> {
    const tool = await prisma.tools.findFirst({
      where: {
        id,
      },
    });

    if (!tool) {
      throw new AppError('Tool Not Found');
    }

    return tool;
  }
}
