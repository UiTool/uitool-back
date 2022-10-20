import { Questions } from '@prisma/client';

import { prisma } from '../../../../database/prismaClient';
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  id: string;
}

export class GetQuestionByIdUseCase {
  async execute({ id }: IRequest): Promise<Questions> {
    const Question = await prisma.questions.findFirst({
      where: {
        id,
      },
    });

    if (!Question) {
      throw new AppError('Question Not Found');
    }

    return Question;
  }
}
