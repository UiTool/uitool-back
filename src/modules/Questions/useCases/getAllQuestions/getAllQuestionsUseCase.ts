import { Questions } from '@prisma/client';

import { prisma } from '../../../../database/prismaClient';
import { AppError } from '../../../../errors/AppError';

export class GetAllQuestionsUseCase {
  async execute(): Promise<Questions[]> {
    const quuestions = await prisma.questions.findMany();

    if (quuestions.length === 0) {
      throw new AppError('None Question');
    }

    return quuestions;
  }
}
