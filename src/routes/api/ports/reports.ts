import { Router } from 'express';

import submitDailyStatusReport from './reports/submit-daily-status-report.js';
import dailyStatusReport from './reports/daily-status-report.js';

const router = Router();

router.use('/submit-daily-status-report/', submitDailyStatusReport);
router.use('/daily-status-report/', dailyStatusReport);

export default router;
