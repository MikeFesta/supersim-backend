import type { SequelizeTable } from '#root/common/Sequelize.js';

export interface VesselInterface extends SequelizeTable {
  name: string;
  viaNo: string;
  cargoCommodity: string;
}
