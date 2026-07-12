import express from 'express';

import { getMessage } from '../Controllers/message.controller.js';
import { sendMessage } from '../Controllers/message.controller.js';
import protectRoute from '../Middleware/protect.route.js';

const router = express.Router();

router.get('/:id', protectRoute,getMessage);
router.post('/send/:id', protectRoute,sendMessage);

export default router;