import { Router } from 'express';

import allTerminals from './terminals/all-terminals.js';

const router = Router();

router.use('/all-terminals/', allTerminals);

export default router;
