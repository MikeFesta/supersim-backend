import { Router } from 'express';
import { ContainerTraffic } from '#root/models/ports/ContainerTraffic.js';
import { DailyReportInterface, PortTerminalsDataInterface } from '#root/common/ports/DailyReport.js';

const router = Router();

const getTerminalData = (terminalId, timePeriod, data) => {
  const matchedData = data.find(item => item.terminalId == terminalId && item.timePeriod == timePeriod);
  if (!matchedData) {
    return { vessels: -1, imports: -1, exports: -1 };
  }

  return {
    vessels: matchedData.vesselCount,
    imports: matchedData.importCount,
    exports: matchedData.exportCount,
  };
};

const getPortTerminalsData = (timePeriod: string, data): PortTerminalsDataInterface => {
  return {
    nsft: getTerminalData(4, timePeriod, data),
    nsict: getTerminalData(5, timePeriod, data),
    nsigt: getTerminalData(6, timePeriod, data),
    apmt: getTerminalData(1, timePeriod, data),
    bmct: getTerminalData(2, timePeriod, data),
    nsdt: getTerminalData(3, timePeriod, data),
  };
};

router.get('/:date', async (req, res) => {
  try {
    const results = await ContainerTraffic.findAll({
      attributes: ['terminalId', 'importCount', 'exportCount', 'vesselCount', 'timePeriod'],
      where: { date: req.params.date },
    });

    const report = {
      date: new Date(req.params.date),
      day: getPortTerminalsData('day', results),
      month: getPortTerminalsData('month', results),
      year: getPortTerminalsData('year', results),
    } as DailyReportInterface;

    res.json({ report });
  } catch (err) {
    res.json({ error: `There was an error: ${(err as Error).message}` });
  }
});

export default router;
