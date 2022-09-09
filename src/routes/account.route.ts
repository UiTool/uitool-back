import { Router } from 'express';

import { AuthController } from '../modules/accounts/useCases/authUser/authController';
import { CreateUsersController } from '../modules/accounts/useCases/createUser/createUsersController';
import { ResetPasswordController } from '../modules/accounts/useCases/resetPassword/resetPasswordController';
import { SendEmailForgotPasswordController } from '../modules/accounts/useCases/sendEmailForgotPassword/sendEmailForgotPasswordController';

const accountRoutes = Router();

const authController = new AuthController();
const createUserController = new CreateUsersController();
const sendEmailForgotPassword = new SendEmailForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

accountRoutes.post('/login', authController.handle);
accountRoutes.post('/create', createUserController.handle);
accountRoutes.post('/forget', sendEmailForgotPassword.handle);
accountRoutes.post('/reset', resetPasswordController.handle);

export { accountRoutes };
