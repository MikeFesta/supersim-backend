import { Router } from 'express';

const router = Router();

router.post('/', async (req, res) => {
  try {
    res.json({
      results: 'Low Tide Simulation - WORK IN PROGRESS',
    });
  } catch (err) {
    res.json({ error: `There was an error: ${(err as Error).message}` });
  }
});

export default router;
