import type { SequelizeTable } from '#root/common/Sequelize.js';

export interface ContainerTrafficInterface extends SequelizeTable {
  date: Date;
  terminalId: number;
  importCount: number;
  exportCount: number;
}
