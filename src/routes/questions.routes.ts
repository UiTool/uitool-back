import { Router } from 'express';

import { CreateQuestionController } from '../modules/Questions/useCases/createQuestion/createQuestionController';
import { DeleteQuestionController } from '../modules/Questions/useCases/deleteQuestion/deleteQuestionController';
import { GetAllQuestionsController } from '../modules/Questions/useCases/getAllQuestions/getAllQuestionsController';
import { GetQuestionByIdController } from '../modules/Questions/useCases/getQuestionById/getQuestionByIdController';
import { UpdateQuestionController } from '../modules/Questions/useCases/updateQuestion/updateQuestionController';

const questionsRoutes = Router();

const createQuestionController = new CreateQuestionController();
const deleteQuestionController = new DeleteQuestionController();
const updateQuestionController = new UpdateQuestionController();
const getAllQuestionsController = new GetAllQuestionsController();
const getQuestionByIdController = new GetQuestionByIdController();

questionsRoutes.get('/:id', getQuestionByIdController.handle);

questionsRoutes.get('/', getAllQuestionsController.handle);

questionsRoutes.post('/', createQuestionController.handle);

questionsRoutes.put('/:id', updateQuestionController.handle);

questionsRoutes.delete('/:id', deleteQuestionController.handle);

export { questionsRoutes };
