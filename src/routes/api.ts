import { Router } from 'express';

import ports from './api/ports.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({
    status: 'API is UP',
  });
});

router.use('/ports', ports);

export default router;
