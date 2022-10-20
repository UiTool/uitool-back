import { prisma } from '../../../../database/prismaClient';
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  id: string;
}

export class DeleteToolUseCase {
  async execute({ id }: IRequest): Promise<IRequest> {
    const tool = await prisma.tools.delete({
      where: {
        id,
      },
    });

    if (!tool) {
      throw new AppError('Tool not found');
    }

    return tool;
  }
}
