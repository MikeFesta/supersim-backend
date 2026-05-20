import { Router } from 'express';

import allBirths from './births/all-births.js';

const router = Router();

router.use('/all-births/', allBirths);

export default router;
