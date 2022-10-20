import { Router } from 'express';
import multer from 'multer';

import { CreateToolController } from '../modules/Tools/useCases/createTool/createToolController';
import { CreateToolsByFileController } from '../modules/Tools/useCases/createToolsByFile/createToolsByFileController';
import { DeleteToolController } from '../modules/Tools/useCases/deleteTool/deleteToolController';
import { GetAllToolsController } from '../modules/Tools/useCases/getAllTools/getAllToolsController';
import { GetToolByIdController } from '../modules/Tools/useCases/getToolById/getToolByIdController';
import { GetToolsByCategoryController } from '../modules/Tools/useCases/getToolsByCategorie/getToolsByCategoryController';
import { GetToolsByTagsController } from '../modules/Tools/useCases/getToolsByTags/getToolsByTagsController';
import { UpdateToolController } from '../modules/Tools/useCases/updateTool/updateToolController';

const toolsRoutes = Router();

const multerConfig = multer();

const createToolsByFileController = new CreateToolsByFileController();
const createToolController = new CreateToolController();
const getToolsByCategoryController = new GetToolsByCategoryController();
const getToolsByTagsController = new GetToolsByTagsController();
const getAllToolsController = new GetAllToolsController();
const deleteToolController = new DeleteToolController();
const updateToolController = new UpdateToolController();
const getToolByIdController = new GetToolByIdController();

toolsRoutes.get('/category/:category', getToolsByCategoryController.handle);

toolsRoutes.get('/:id', getToolByIdController.handle);

toolsRoutes.get('/tags', getToolsByTagsController.handle);

toolsRoutes.get('/', getAllToolsController.handle);

toolsRoutes.post('/', createToolController.handle);

toolsRoutes.post(
  '/tools',
  multerConfig.single('toolsFile'),
  createToolsByFileController.handle,
);

toolsRoutes.put('/:id', updateToolController.handle);

toolsRoutes.delete('/:id', deleteToolController.handle);

export { toolsRoutes };
