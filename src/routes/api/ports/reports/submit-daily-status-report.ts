import { Router } from 'express';
import { DailyReportInterface } from '#root/common/ports/DailyReport.js';
import { ContainerTraffic } from '#root/models/ports/ContainerTraffic.js';

const router = Router();

const createContainerTrafficEntry = async (
  date: string,
  terminalId: number,
  timePeriod: string,
  vesselCount: number,
  importCount: number,
  exportCount: number,
) => {
  console.log(
    `Creating entry for ${terminalId} in ${timePeriod} on ${date}. V:${vesselCount}.I${importCount}.E${exportCount}`,
  );
  await ContainerTraffic.create({
    date: new Date(date),
    exportCount,
    importCount,
    terminalId,
    timePeriod: timePeriod as 'day' | 'month' | 'year',
    vesselCount,
  });
};

router.post('/', async (req, res) => {
  try {
    // TODO: Ensure the user is logged in
    const data = req.body.data as DailyReportInterface;
    if (!data) {
      throw new Error('No Data Provided');
    }

    // Remove the time component
    const dateOnly = (data.date as unknown as string).split('T')[0];

    // Ensure data has not been added yet for this date (safety check for now, later will allow editing)
    const dailyTrafficEntries = await ContainerTraffic.count({ where: { date: dateOnly } });

    if (dailyTrafficEntries > 0) {
      throw new Error(`There are already ${dailyTrafficEntries} entries for ${dateOnly}`);
    }

    if (data.day === null || data.month === null || data.year === null) {
      throw new Error('Missing Data');
    }

    // Create all of the entries that I need from a daily report (18 entries = 6 terminals x 3 times)
    // NSFT
    await createContainerTrafficEntry(
      dateOnly,
      4,
      'day',
      data.day.nsft.vessels,
      data.day.nsft.imports,
      data.day.nsft.exports,
    );
    await createContainerTrafficEntry(
      dateOnly,
      4,
      'month',
      data.month.nsft.vessels,
      data.month.nsft.imports,
      data.month.nsft.exports,
    );
    await createContainerTrafficEntry(
      dateOnly,
      4,
      'year',
      data.year.nsft.vessels,
      data.year.nsft.imports,
      data.year.nsft.exports,
    );

    // NSICT
    await createContainerTrafficEntry(
      dateOnly,
      5,
      'day',
      data.day.nsict.vessels,
      data.day.nsict.imports,
      data.day.nsict.exports,
    );
    await createContainerTrafficEntry(
      dateOnly,
      5,
      'month',
      data.month.nsict.vessels,
      data.month.nsict.imports,
      data.month.nsict.exports,
    );
    await createContainerTrafficEntry(
      dateOnly,
      5,
      'year',
      data.year.nsict.vessels,
      data.year.nsict.imports,
      data.year.nsict.exports,
    );

    // NSIGT
    await createContainerTrafficEntry(
      dateOnly,
      6,
      'day',
      data.day.nsigt.vessels,
      data.day.nsigt.imports,
      data.day.nsigt.exports,
    );
    await createContainerTrafficEntry(
      dateOnly,
      6,
      'month',
      data.month.nsigt.vessels,
      data.month.nsigt.imports,
      data.month.nsigt.exports,
    );
    await createContainerTrafficEntry(
      dateOnly,
      6,
      'year',
      data.year.nsigt.vessels,
      data.year.nsigt.imports,
      data.year.nsigt.exports,
    );

    // APMT
    await createContainerTrafficEntry(
      dateOnly,
      1,
      'day',
      data.day.apmt.vessels,
      data.day.apmt.imports,
      data.day.apmt.exports,
    );
    await createContainerTrafficEntry(
      dateOnly,
      1,
      'month',
      data.month.apmt.vessels,
      data.month.apmt.imports,
      data.month.apmt.exports,
    );
    await createContainerTrafficEntry(
      dateOnly,
      1,
      'year',
      data.year.apmt.vessels,
      data.year.apmt.imports,
      data.year.apmt.exports,
    );

    // BMCT
    await createContainerTrafficEntry(
      dateOnly,
      2,
      'day',
      data.day.bmct.vessels,
      data.day.bmct.imports,
      data.day.bmct.exports,
    );
    await createContainerTrafficEntry(
      dateOnly,
      2,
      'month',
      data.month.bmct.vessels,
      data.month.bmct.imports,
      data.month.bmct.exports,
    );
    await createContainerTrafficEntry(
      dateOnly,
      2,
      'year',
      data.year.bmct.vessels,
      data.year.bmct.imports,
      data.year.bmct.exports,
    );

    // NSDT
    await createContainerTrafficEntry(
      dateOnly,
      3,
      'day',
      data.day.nsdt.vessels,
      data.day.nsdt.imports,
      data.day.nsdt.exports,
    );
    await createContainerTrafficEntry(
      dateOnly,
      3,
      'month',
      data.month.nsdt.vessels,
      data.month.nsdt.imports,
      data.month.nsdt.exports,
    );
    await createContainerTrafficEntry(
      dateOnly,
      3,
      'year',
      data.year.nsdt.vessels,
      data.year.nsdt.imports,
      data.year.nsdt.exports,
    );

    const newTrafficEntries = await ContainerTraffic.count({ where: { date: dateOnly } });

    res.json({
      date: dateOnly,
      newCount: newTrafficEntries,
    });
  } catch (err) {
    res.json({ error: `There was an error: ${(err as Error).message}` });
  }
});

export default router;
