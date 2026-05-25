import { Router } from 'express';
import { Birth } from '#root/models/ports/Birth.js';
import { Vessel } from '#root/models/ports/Vessel.js';
import { BirthedVessel } from '#root/models/ports/BirthedVessels.js';
import { Op } from 'sequelize';
import { WhereOptions } from '@sequelize/core';

const router = Router();

router.get('/:date', async (req, res) => {
  try {
    // await BirthedVessel.bulkCreate([
    //   {
    //     vesselId: 1,
    //     birthId: 13,
    //     birthedOn: new Date('2026-05-24T01:48:00+05:30'),
    //     expectedCompletion: new Date('2026-05-24T19:00:00+05:30'),
    //     reportedOn: new Date('2026-05-24T07:00:00+05:30'),
    //   },
    // {
    //   vesselId: 2,
    //   birthId: 14,
    //   birthedOn: new Date('2026-05-23T23:18:00+05:30'),
    //   expectedCompletion: new Date('2026-05-24T18:00:00+05:30'),
    //   reportedOn: new Date('2026-05-24T07:00:00+05:30'),
    // },
    // {
    //   vesselId: 3,
    //   birthId: 16,
    //   birthedOn: new Date('2026-05-23T20:30:00+05:30'),
    //   expectedCompletion: new Date('2026-05-24T12:00:00+05:30'),
    //   reportedOn: new Date('2026-05-24T07:00:00+05:30'),
    // },
    // {
    //   vesselId: 4,
    //   birthId: 18,
    //   birthedOn: new Date('2026-05-23T23:54:00+05:30'),
    //   expectedCompletion: new Date('2026-05-24T07:30:00+05:30'),
    //   reportedOn: new Date('2026-05-24T07:00:00+05:30'),
    // },
    // {
    //   vesselId: 5,
    //   birthId: 1,
    //   birthedOn: new Date('2026-05-24T01:30:00+05:30'),
    //   expectedCompletion: new Date('2026-05-25T12:30:00+05:30'),
    //   reportedOn: new Date('2026-05-24T07:00:00+05:30'),
    // },
    // APMT APMT-02 S0387 JIRA BHUM CONTAINER 23-05-2026 15:42 24-05-2026 23:30
    // {
    //   vesselId: 6,
    //   birthId: 2,
    //   birthedOn: new Date('2026-05-23T15:42:00+05:30'),
    //   expectedCompletion: new Date('2026-05-24T23:30:00+05:30'),
    //   reportedOn: new Date('2026-05-24T07:00:00+05:30'),
    // },
    // // BMCT BMCT-01 S0388 CELSIUS EINDHOVEN CONTAINER 22-05-2026 17:12 24-05-2026 11:00
    // {
    //   vesselId: 7,
    //   birthId: 3,
    //   birthedOn: new Date('2026-05-22T17:12:00+05:30'),
    //   expectedCompletion: new Date('2026-05-24T11:00:00+05:30'),
    //   reportedOn: new Date('2026-05-24T07:00:00+05:30'),
    // },
    // // BMCT BMCT-02 S0431 XPRESS CAPELLA CONTAINER 24-05-2026 06:42 25-05-2026 09:00
    // {
    //   vesselId: 8,
    //   birthId: 4,
    //   birthedOn: new Date('2026-05-24T06:42:00+05:30'),
    //   expectedCompletion: new Date('2026-05-25T09:00:00+05:30'),
    //   reportedOn: new Date('2026-05-24T07:00:00+05:30'),
    // },
    // // BMCT BMCT-03 S0394 EVER EXCEL CONTAINER 24-05-2026 01:30 24-05-2026 20:00
    // {
    //   vesselId: 9,
    //   birthId: 5,
    //   birthedOn: new Date('2026-05-24T01:30:00+05:30'),
    //   expectedCompletion: new Date('2026-05-24T20:00:00+05:30'),
    //   reportedOn: new Date('2026-05-24T07:00:00+05:30'),
    // },
    // // BMCT BMCT-04 S0465 MSC MILAN CONTAINER 23-05-2026 18:12 25-05-2026 12:00
    // {
    //   vesselId: 10,
    //   birthId: 6,
    //   birthedOn: new Date('2026-05-23T18:12:00+05:30'),
    //   expectedCompletion: new Date('2026-05-25T12:00:00+05:30'),
    //   reportedOn: new Date('2026-05-24T07:00:00+05:30'),
    // },
    // BMCT BMCT-05 S0502 MSC MARIANNA CONTAINER 22-05-2026 18:42 24-05-2026 12:00
    // {
    //   vesselId: 11,
    //   birthId: 7,
    //   birthedOn: new Date('2026-05-22T18:42:00+05:30'),
    //   expectedCompletion: new Date('2026-05-24T12:00:00+05:30'),
    //   reportedOn: new Date('2026-05-24T07:00:00+05:30'),
    // },
    // BPCL LB-01 S6288 DUBAI ATTRACTION CBFS 23-05-2026 13:18 24-05-2026 17:00
    // {
    //   vesselId: 12,
    //   birthId: !!,
    //   birthedOn: new Date('2026-05-22T17:12:00+05:30'),
    //   expectedCompletion: new Date('2026-05-24T11:00:00+05:30'),
    //   reportedOn: new Date('2026-05-24T07:00:00+05:30'),
    // },
    // // BPCL LB-02 S6285 CHEMROAD HAWK CHEMICALS 24-05-2026 07:48 25-05-2026 23:00
    // {
    //   vesselId: 13,
    //   birthId: !!,
    //   birthedOn: new Date('2026-05-24T06:42:00+05:30'),
    //   expectedCompletion: new Date('2026-05-25T09:00:00+05:30'),
    //   reportedOn: new Date('2026-05-24T07:00:00+05:30'),
    // },
    // NSDT CCB-N R7657 ARHAAN DREDGER 24-03-2026 17:40
    // {
    //   vesselId: 14,
    //   birthId: 9,
    //   birthedOn: new Date('2026-05-24T17:40:00+05:30'),
    //   reportedOn: new Date('2026-05-24T07:00:00+05:30'),
    // },
    // // NSDT NSD-03 S6302 RAS GHUMAYS I PROJECT CARGO 24-05-2026 01:00 25-05-2026 17:0
    // {
    //   vesselId: 15,
    //   birthId: 11,
    //   birthedOn: new Date('2026-05-24T01:00:00+05:30'),
    //   expectedCompletion: new Date('2026-05-25T17:00:00+05:30'),
    //   reportedOn: new Date('2026-05-24T07:00:00+05:30'),
    // },
    // ]);

    const targetDate = new Date(req.params.date);
    const nextDay = new Date(targetDate);
    nextDay.setDate(targetDate.getDate() + 1);

    const birthedVessels = await BirthedVessel.findAll({
      attributes: ['birthId', 'vesselId', 'birthedOn', 'expectedCompletion'],
      include: [
        {
          as: 'birth',
          attributes: ['terminalId', 'name'],
          include: [
            {
              as: 'terminal',
              attributes: ['name'],
            },
          ],
        },
        {
          as: 'vessel',
          attributes: ['viaNo', 'name', 'cargoCommodity'],
        },
      ],
      where: {
        reportedOn: {
          [Op.gte]: targetDate,
          [Op.lt]: nextDay,
        },
      } as WhereOptions<BirthedVessel>,
    });
    // const births = await Birth.findAll();
    // const vessels = await Vessel.findAll();

    res.json({
      date: req.params.date,
      birthedVessels,
      // births,
      // vessels,
    });
  } catch (err) {
    res.json({ error: `There was an error: ${(err as Error).message}` });
  }
});

export default router;

/*
await Vessel.bulkCreate([
      {
        viaNo: 'S0508',
        name: 'AN YANG',
        cargoCommodity: 'CONTAINER',
      },
      {
        viaNo: 'S0342',
        name: 'WADI DUKA',
        cargoCommodity: 'CONTAINER',
      },
      {
        viaNo: 'S0416',
        name: 'CMA CGM ZANZIBAR',
        cargoCommodity: 'CONTAINER',
      },
      {
        viaNo: 'S0506',
        name: 'FOS EXPRESS',
        cargoCommodity: 'CONTAINER',
      },
      {
        viaNo: 'S0277',
        name: 'STRATFORD',
        cargoCommodity: 'CONTAINER',
      },
      {
        viaNo: 'S0387',
        name: 'JIRA BHUM',
        cargoCommodity: 'CONTAINER',
      },
      {
        viaNo: 'S0388',
        name: 'CELSIUS EINDHOVEN',
        cargoCommodity: 'CONTAINER',
      },
      {
        viaNo: 'S0431',
        name: 'XPRESS CAPELLA',
        cargoCommodity: 'CONTAINER',
      },
      {
        viaNo: 'S0394',
        name: 'EVER EXCEL',
        cargoCommodity: 'CONTAINER',
      },
      {
        viaNo: 'S0465',
        name: 'MSC MILAN',
        cargoCommodity: 'CONTAINER',
      },
      {
        viaNo: 'S0502',
        name: 'MSC MARIANNA',
        cargoCommodity: 'CONTAINER',
      },
      {
        viaNo: 'S6288',
        name: 'DUBAI ATTRACTION',
        cargoCommodity: 'CBFS',
      },
      {
        viaNo: 'S6285',
        name: 'CHEMROAD HAWK',
        cargoCommodity: 'CHEMICALS',
      },
      {
        viaNo: 'R7657',
        name: 'ARHAAN',
        cargoCommodity: 'DREDGER',
      },
      {
        viaNo: 'S6302',
        name: 'RAS GHUMAYS I',
        cargoCommodity: 'PROJECT CARGO',
      },
    ]);
    */
