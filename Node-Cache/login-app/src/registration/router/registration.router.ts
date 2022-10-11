import { Router } from "express";
import * as registrationController from '../controller/registration.controller'

const router = Router();

router.post('/', registrationController.registerUser);

export default router;