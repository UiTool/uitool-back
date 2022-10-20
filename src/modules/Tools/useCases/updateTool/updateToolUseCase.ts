import { prisma } from '../../../../database/prismaClient';
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  id: string;
  name?: string;
  description?: string;
  link?: string;
  image?: string;
  categories?: string[];
  tags?: string[];
}

export class UpdateToolUseCase {
  async execute({
    id,
    name,
    description,
    link,
    image,
    categories,
    tags,
  }: IRequest): Promise<IRequest> {
    const tool = await prisma.tools.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        link,
        image,
        categories,
        tags,
      },
    });

    if (!tool) {
      throw new AppError('Tool not found');
    }

    return tool;
  }
}
