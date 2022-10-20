import { prisma } from '../../../../database/prismaClient';
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  name: string;
  description: string;
  link: string;
  categories: string[];
  tags: string[];
}

export class CreateToolsByFileUseCase {
  async execute(toolsRequest: IRequest[]): Promise<void> {
    const tools: IRequest[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const tool of toolsRequest) {
      const findTool = await prisma.tools.findFirst({
        where: {
          name: tool.name,
        },
      });

      if (!findTool) {
        tools.push(tool);
      }
    }

    if (tools.length === 0) {
      throw new AppError('All tools are already registered');
    }

    await prisma.tools.createMany({
      data: tools,
    });
  }
}
