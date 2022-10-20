import { prisma } from '../../../../database/prismaClient';
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  name: string;
  description: string;
  link: string;
  image: string;
  categories: string[];
  tags: string[];
}

export class CreateToolUseCase {
  async execute({
    name,
    description,
    link,
    image,
    categories,
    tags,
  }: IRequest): Promise<IRequest> {
    const alredyExistTool = await prisma.tools.findFirst({
      where: {
        name,
      },
    });

    if (alredyExistTool) {
      throw new AppError('Tool is already registered');
    }

    const tool = await prisma.tools.create({
      data: {
        name,
        description,
        link,
        image,
        categories,
        tags,
      },
    });

    return tool;
  }
}
