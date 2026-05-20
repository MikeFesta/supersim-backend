import { Router } from 'express';
import { Crane } from '#root/models/ports/Crane.js';
import { CraneInterface } from '#root/common/ports/Crane.js.js';
import { CreationAttributes } from '@sequelize/core';

const router = Router();

router.get('/', async (req, res) => {
  try {
    /*
    let newCranes: CreationAttributes<Crane>[] = [];
    for (let i = 0; i < 43; i++) {
      let birthId = 1;
      let terminalId = 1;

      if (i < 4) {
        // defaults
      } else if (i < 8) {
        birthId = 2;
        // terminal 1
      } else if (i < 26) {
        birthId = Math.floor((i - 8) / 3) + 3;
        terminalId = 2;
      } else if (i < 30) {
        birthId = i - 17;
        terminalId = 3;
      } else if (i < 34) {
        terminalId = 4;
        birthId = Math.floor(i / 2) - 2;
      } else if (i < 40) {
        terminalId = 5;
        birthId = Math.floor((i - 34) / 3) + 16;
      } else {
        terminalId = 6;
        birthId = 18;
      }
      newCranes.push({
        name: `Crane-${i + 1}`,
        birthId,
        terminalId,
        statusId: 1,
      });
    }
    console.log(newCranes);
    await Crane.bulkCreate(newCranes);
    */

    const cranes = await Crane.findAll({
      attributes: ['id', 'uuid', 'name', 'terminalId', 'birthId'],
    });
    res.json({ cranes });
  } catch (err) {
    res.json({ error: `There was an error: ${(err as Error).message}` });
  }
});

export default router;
