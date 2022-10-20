import { prisma } from '../../../../database/prismaClient';
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  id: string;
}

export class DeleteQuestionUseCase {
  async execute({ id }: IRequest): Promise<IRequest> {
    const question = await prisma.questions.delete({
      where: {
        id,
      },
    });

    if (!question) {
      throw new AppError('Question not found');
    }

    return question;
  }
}
