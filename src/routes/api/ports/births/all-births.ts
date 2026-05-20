import { Router } from 'express';
import { Birth } from '#root/models/ports/Birth.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const births = await Birth.findAll({
      attributes: ['id', 'uuid', 'name', 'terminalId'],
    });
    res.json({ births });
  } catch (err) {
    res.json({ error: `There was an error: ${(err as Error).message}` });
  }
});

export default router;
