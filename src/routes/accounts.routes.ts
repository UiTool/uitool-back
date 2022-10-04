import { Router } from 'express';

import { AuthController } from '../modules/accounts/useCases/authUser/authController';
import { CreateUsersController } from '../modules/accounts/useCases/createUser/createUsersController';
import { ResetPasswordController } from '../modules/accounts/useCases/resetPassword/resetPasswordController';
import { SendEmailForgotPasswordController } from '../modules/accounts/useCases/sendEmailForgotPassword/sendEmailForgotPasswordController';
import { SocialAuthController } from '../modules/accounts/useCases/socialAuth/socialAuthController';

const accountsRoutes = Router();

const authController = new AuthController();
const createUserController = new CreateUsersController();
const sendEmailForgotPassword = new SendEmailForgotPasswordController();
const resetPasswordController = new ResetPasswordController();
const socialAuthController = new SocialAuthController();

accountsRoutes.post('/login', authController.handle);
accountsRoutes.post('/create', createUserController.handle);
accountsRoutes.post('/forget', sendEmailForgotPassword.handle);
accountsRoutes.post('/reset', resetPasswordController.handle);
accountsRoutes.post('/social', socialAuthController.handle);

export { accountsRoutes };
