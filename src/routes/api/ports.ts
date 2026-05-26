import { Router } from 'express';
import births from './ports/births.js';
import cranes from './ports/cranes.js';
import reports from './ports/reports.js';
import simulation from './ports/simulation.js';
import terminals from './ports/terminals.js';
import vessels from './ports/vessels.js';

const router = Router();

router.use('/births', births);
router.use('/cranes', cranes);
router.use('/reports', reports);
router.use('/simulation', simulation);
router.use('/terminals', terminals);
router.use('/vessels', vessels);

export default router;
