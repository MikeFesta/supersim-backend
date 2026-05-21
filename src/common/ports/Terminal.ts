import type { SequelizeTable } from '#root/common/Sequelize.js';
import type { BirthInterface } from '#root/common/ports/Birth.js';
import { ContainerTrafficInterface } from './ContainerTraffic.js';

export interface TerminalInterface extends SequelizeTable {
  name: string;
  births: BirthInterface[];
  containerTraffic: ContainerTrafficInterface;
  // color: Color;
  // region: number[];
}
