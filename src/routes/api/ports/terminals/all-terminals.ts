import { Router } from 'express';
import { Terminal } from '#root/models/ports/Terminal.js';
import { Birth } from '#root/models/ports/Birth.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const terminals = await Terminal.findAll({
      attributes: ['id', 'uuid', 'name'],
      include: {
        as: 'births',
        attributes: ['id', 'uuid', 'name', 'is_occupied'],
        model: Birth,
      },
    });
    res.json({
      terminals,
    });
  } catch (err) {
    res.json({ error: `There was an error: ${(err as Error).message}` });
  }
});

export default router;
