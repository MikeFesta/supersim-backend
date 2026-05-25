import type { SequelizeTable } from '#root/common/Sequelize.js';
import { BirthInterface } from './Birth.js';
import { VesselInterface } from './Vessel.js';

export interface BirthedVesselInterface extends SequelizeTable {
  birthId: number;
  birthedOn: Date;
  expectedCompletion?: Date;
  reportedOn: Date;
  vesselId: number;

  birth?: BirthInterface;
  vessel?: VesselInterface;
}
