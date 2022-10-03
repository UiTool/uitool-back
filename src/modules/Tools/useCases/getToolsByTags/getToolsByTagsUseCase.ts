import { Tools } from '@prisma/client';

import { prisma } from '../../../../database/prismaClient';
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  tags: string[];
}

export class GetToolsByTagsUseCase {
  async execute({ tags }: IRequest): Promise<Tools[]> {
    const tools = await prisma.tools.findMany({
      where: {
        tags: {
          hasSome: tags,
        },
      },
    });

    if (tools.length === 0) {
      throw new AppError('No tool corresponds to these tags');
    }

    return tools;
  }
}
