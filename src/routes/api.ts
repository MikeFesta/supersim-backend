import { Router } from 'express';

import terminals from './api/terminals.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({
    status: 'API is UP',
  });
});

router.use('/terminals', terminals);

export default router;
