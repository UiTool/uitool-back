import { Router, Request, Response } from 'express';

import { accountRoutes } from './account.route';

const router = Router();

router.get('/', (request: Request, response: Response) => {
  response.send('🖌️  Server Online!');
});

router.use('/account', accountRoutes);

export { router };
