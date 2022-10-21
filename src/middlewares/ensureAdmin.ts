import { AppError } from 'errors/AppError';
import { Request, Response, NextFunction } from 'express';

import { prisma } from '../database/prismaClient';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.user;

  if (!id) {
    throw new AppError('Not');
  }

  const user = await prisma.users.findFirst({
    where: {
      id,
    },
  });

  if (user && !user.isAdmin) {
    throw new AppError('User is not admin!');
  }

  return next();
}
