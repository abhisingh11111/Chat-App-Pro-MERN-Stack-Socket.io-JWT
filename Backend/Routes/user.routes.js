import express from 'express';
import protectRoute from '../Middleware/protect.route.js';
import { getUserforSidebar } from '../Controllers/user.controller.js';

const router = express.Router();

router.get('/',protectRoute,getUserforSidebar);

export default router;