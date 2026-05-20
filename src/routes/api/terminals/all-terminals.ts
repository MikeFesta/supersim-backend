import { Router } from 'express';
import { Terminal } from '#root/models/terminal/Terminal.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const terminals = await Terminal.findAll({
      attributes: ['id', 'uuid', 'name'],
    });
    res.json({
      terminals: terminals,
    });
  } catch (err) {
    res.json({ error: `There was an error: ${(err as Error).message}` });
  }
});

export default router;
