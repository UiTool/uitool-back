import { Tools } from '@prisma/client';

import { prisma } from '../../../../database/prismaClient';
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  category: string;
}

export class GetToolsByCategoryUseCase {
  async execute({ category }: IRequest): Promise<Tools[]> {
    const tools = await prisma.tools.findMany({
      where: {
        categories: {
          has: category,
        },
      },
    });

    if (!tools) {
      throw new AppError('No tool corresponds to this category');
    }

    return tools;
  }
}
