import { Router } from "express";
import { verifyToken } from "../../auth/auth";
import * as userController from '../controller/user.controller'

const router = Router();

router.get('/', verifyToken, userController.getUser);

export default router;