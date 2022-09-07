import { AuthController } from '@modules/accounts/useCases/authUser/authController';
import { CreateUsersController } from '@modules/accounts/useCases/createUser/createUsersController';
import { Router } from 'express';

const accountRoutes = Router();

const authController = new AuthController();
const createUserController = new CreateUsersController();

accountRoutes.post('/login', authController.handle);
accountRoutes.post('/create', createUserController.handle);

export { accountRoutes };
