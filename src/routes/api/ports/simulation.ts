import { Router } from 'express';

import lowTide from './simulation/low-tide.js';

const router = Router();

router.use('/low-tide/', lowTide);

export default router;
