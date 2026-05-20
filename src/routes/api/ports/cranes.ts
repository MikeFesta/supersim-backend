import { Router } from 'express';

import allCranes from './cranes/all-cranes.js';

const router = Router();

router.use('/all-cranes/', allCranes);

export default router;
