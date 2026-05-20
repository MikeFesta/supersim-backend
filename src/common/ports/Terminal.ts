import type { SequelizeTable } from '#root/common/Sequelize.js';
import type { BirthInterface } from '#root/common/ports/Birth.js';

export interface TerminalInterface extends SequelizeTable {
  name: string;
  births: BirthInterface[];
  // color: Color;
  // region: number[];
}
