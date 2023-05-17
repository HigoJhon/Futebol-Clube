import { Router } from 'express';
import LoginController from '../controller/LoginConntroller';
import validLogin from '../middlewares/validLogin';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/', validLogin, (req, res) => loginController.post(req, res));
loginRouter.get('/role', (req, res) => loginController.get(req, res));

export default loginRouter;
