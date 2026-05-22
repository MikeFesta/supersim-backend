import { Router } from 'express';
import { Birth } from '#root/models/ports/Birth.js';
import { Crane } from '#root/models/ports/Crane.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const births = await Birth.findAll({
      attributes: ['id', 'uuid', 'name', 'terminalId', 'isOccupied'],
      include: {
        as: 'cranes',
        attributes: ['name'],
        model: Crane,
      },
    });
    res.json({ births });
  } catch (err) {
    res.json({ error: `There was an error: ${(err as Error).message}` });
  }
});

export default router;
