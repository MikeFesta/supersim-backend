import { Router } from 'express';
import { ContainerTraffic } from '#root/models/ports/ContainerTraffic.js';
import { Terminal } from '#root/models/ports/Terminal.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    /* May 13th Data
    await ContainerTraffic.bulkCreate([
      {
        date: new Date('2026-05-13'),
        terminalId: 4,
        importCount: 1848,
        exportCount: 1785,
      },
      {
        date: new Date('2026-05-13'),
        terminalId: 5,
        importCount: 1066,
        exportCount: 1171,
      },
      {
        date: new Date('2026-05-13'),
        terminalId: 6,
        importCount: 1959,
        exportCount: 1240,
      },
      {
        date: new Date('2026-05-13'),
        terminalId: 1,
        importCount: 0,
        exportCount: 0,
      },
      {
        date: new Date('2026-05-13'),
        terminalId: 2,
        importCount: 5571,
        exportCount: 2608,
      },
      {
        date: new Date('2026-05-13'),
        terminalId: 3,
        importCount: 437,
        exportCount: 235,
      },
    ]);
    */

    const terminalsWithContainerTraffic = await Terminal.findAll({
      attributes: ['id', 'uuid', 'name'],
      include: {
        as: 'containerTraffic',
        attributes: ['date', 'importCount', 'exportCount'],
        model: ContainerTraffic,
      },
      // TODO: Add a date parameter to select a specific date
    });

    res.json({
      terminalsWithContainerTraffic,
    });
  } catch (err) {
    res.json({ error: `There was an error: ${(err as Error).message}` });
  }
});

export default router;
