import { Router } from 'express';
import { validate } from '../../middleware/validate.js';
import { registerSchema, loginSchema } from '../users/users.schema.js';
import { registerCtrl, loginCtrl } from './auth.controller.js';

const router = Router();

router.post('/register', validate(registerSchema), registerCtrl);

router.post('/login', validate(loginSchema), loginCtrl);

export default router;
