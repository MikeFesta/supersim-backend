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

      // These IDs now match Sheet5 on the JNPA Port Mumbai spreadsheet.
      if (i < 18) {
        // BMCT (2)
        terminalId = 2;
        birthId = Math.floor(i / 3) + 3; // 3 to 8
        // terminal 1
      } else if (i < 26) {
        // APMT (1)
        terminalId = 1;
        if (i < 22) {
          birthId = 1;
        } else {
          birthId = 2;
        }
      } else if (i < 30) {
        // NSFT (4)
        terminalId = 4;
        birthId = Math.floor(i / 2); // 13, 14
      } else if (i < 33) {
        // NSIGT (6)
        terminalId = 6;
        birthId = 18; // only 1 birth
      } else if (i < 39) {
        // NSICT (5)
        terminalId = 5;
        birthId = Math.floor((i - 33) / 3) + 16;
      } else {
        // NSDT (3)
        terminalId = 3;
        birthId = i - 30; // 9, 10, 11, 12
      }
      newCranes.push({
        name: `c${i + 1}`,
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
