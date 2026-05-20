import { Router } from 'express';
import births from './ports/births.js';
import cranes from './ports/cranes.js';
import terminals from './ports/terminals.js';

const router = Router();

router.use('/births', births);
router.use('/cranes', cranes);
router.use('/terminals', terminals);

export default router;
