import { prisma } from '../../../../database/prismaClient';
import { AppError } from '../../../../errors/AppError';

type Answers = {
  answer: string;
  tags: string[];
};

interface IRequest {
  id: string;
  question?: string;
  answers?: Answers[];
}

export class UpdateQuestionUseCase {
  async execute({ id, question, answers }: IRequest): Promise<IRequest> {
    const newQuestion = await prisma.questions.update({
      where: {
        id,
      },
      data: {
        question,
        answers,
      },
    });

    if (!newQuestion) {
      throw new AppError('Question not found');
    }

    return newQuestion;
  }
}
