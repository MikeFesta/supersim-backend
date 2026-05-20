import type { SequelizeTable } from '#root/common/Sequelize.js';
import type { CraneInterface } from '#root/common/ports/Crane.js';

export interface BirthInterface extends SequelizeTable {
  name: string;
  terminalId: number;
  cranes: CraneInterface[];
  isOccupied: boolean;
}
