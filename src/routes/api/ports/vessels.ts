import { Router } from 'express';

import vesselsByDate from './vessels/birthed-vessels-by-date.js';

const router = Router();

router.use('/birthed-vessels-by-date/', vesselsByDate);

export default router;
