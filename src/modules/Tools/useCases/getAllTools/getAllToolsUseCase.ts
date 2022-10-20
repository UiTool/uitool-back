import { Tools } from '@prisma/client';

import { prisma } from '../../../../database/prismaClient';
import { AppError } from '../../../../errors/AppError';

export class GetAllToolsUseCase {
  async execute(): Promise<Tools[]> {
    const tools = await prisma.tools.findMany();

    if (tools.length === 0) {
      throw new AppError('None Tools');
    }

    return tools;
  }
}
