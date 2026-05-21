import { Router } from 'express';

import allTerminals from './terminals/all-terminals.js';
import containerTraffic from './terminals/container-traffic.js';

const router = Router();

router.use('/all-terminals/', allTerminals);
router.use('/container-traffic/', containerTraffic);

export default router;
