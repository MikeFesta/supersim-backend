import type { SequelizeTable } from '#root/common/Sequelize.js';

export interface ContainerTrafficInterface extends SequelizeTable {
  date: Date;
  exportCount: number;
  importCount: number;
  terminalId: number;
  timePeriod: 'day' | 'month' | 'year';
  vesselCount: number;
}
