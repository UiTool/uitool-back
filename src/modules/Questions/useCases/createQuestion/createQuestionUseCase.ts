import { prisma } from '../../../../database/prismaClient';
import { AppError } from '../../../../errors/AppError';

type Answers = {
  answer: string;
  tags: string[];
};

interface IRequest {
  question: string;
  answers: Answers[];
}

export class CreateQuestionUseCase {
  async execute({ question, answers }: IRequest): Promise<IRequest> {
    const alredyExistQuestion = await prisma.questions.findFirst({
      where: {
        question,
      },
    });

    if (alredyExistQuestion) {
      throw new AppError('Question is already registered');
    }

    const newQuestion = await prisma.questions.create({
      data: {
        question,
        answers,
      },
    });

    return newQuestion;
  }
}
