import type { SequelizeTable } from '#root/common/Sequelize.js';

export interface CraneInterface extends SequelizeTable {
  name: string;
  terminalId: number;
  birthId: number;
  statusId: number;
}
