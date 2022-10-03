import { Router } from 'express';
import multer from 'multer';

import { CreateToolsController } from '../modules/Tools/useCases/createTools/createToolsController';
import { GetToolsByCategoryController } from '../modules/Tools/useCases/getToolsByCategorie/getToolsByCategoryController';
import { GetToolsByTagsController } from '../modules/Tools/useCases/getToolsByTags/getToolsByTagsController';

const toolsRoutes = Router();

const multerConfig = multer();

const getToolsByCategoryController = new GetToolsByCategoryController();
const createToolsController = new CreateToolsController();
const getToolsByTagsController = new GetToolsByTagsController();

toolsRoutes.get('/category', getToolsByCategoryController.handle);

toolsRoutes.get('/tags', getToolsByTagsController.handle);

toolsRoutes.post(
  '/tools',
  multerConfig.single('toolsFile'),
  createToolsController.handle,
);

export { toolsRoutes };
