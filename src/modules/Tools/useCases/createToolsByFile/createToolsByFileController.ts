import { Request, Response } from 'express';
import readline from 'readline';
import { Readable } from 'stream';

import { CreateToolsByFileUseCase } from './createToolsByFileUseCase';

interface ITools {
  name: string;
  description: string;
  link: string;
  categories: string[];
  tags: string[];
}

export class CreateToolsByFileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const buffer = request.file?.buffer;

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const toolsLine = readline.createInterface({
      input: readableFile,
    });

    const tools: ITools[] = [];

    // eslint-disable-next-line no-restricted-syntax, prefer-const
    for await (let line of toolsLine) {
      const tool = line.split(',');
      const toolCategories = tool[3].split(';');
      const toolTags = tool[4].split(';');
      const categories: string[] = [];
      const tags: string[] = [];
      // eslint-disable-next-line no-restricted-syntax
      for await (const category of toolCategories) {
        categories.push(category);
      }

      // eslint-disable-next-line no-restricted-syntax
      for await (const tag of toolTags) {
        tags.push(tag);
      }

      tools.push({
        name: tool[0],
        description: tool[1],
        link: tool[2],
        categories,
        tags,
      });
    }

    const createToolsByFileUseCase = new CreateToolsByFileUseCase();

    await createToolsByFileUseCase.execute(tools.slice(1));

    return response.status(201).send();
  }
}
