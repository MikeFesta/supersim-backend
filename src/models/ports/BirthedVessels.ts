import { DataTypes } from '@sequelize/core';
import { postgres } from '#root/database/postgres.js';
import { baseAttributes } from '#root/models/BaseAttributes.js';
import { BaseModel } from '#root/models/BaseModel.js';
import type { BirthedVesselInterface } from '#root/common/ports/BirthedVessel.js';
import type { VesselInterface } from '#root/common/ports/Vessel.js';
import { BirthInterface } from '#root/common/ports/Birth.js';

export class BirthedVessel extends BaseModel<BirthedVessel> implements BirthedVesselInterface {
  declare birthId: number;
  declare birthedOn: Date;
  declare expectedCompletion?: Date;
  declare reportedOn: Date;
  declare vesselId: number;

  declare birth?: BirthInterface;
  declare vessel?: VesselInterface;

  // Virtuals

  // Associations
  static async associate() {
    // none
    const { Birth } = await import('#root/models/ports/Birth.js');
    const { Vessel } = await import('#root/models/ports/Vessel.js');
    BirthedVessel.belongsTo(Birth, {
      as: 'birth',
      foreignKey: 'birthId',
    });
    BirthedVessel.belongsTo(Vessel, {
      as: 'vessel',
      foreignKey: 'vesselId',
    });
  }

  // Instance Methods
  // none

  // Static Methods
  // none
}

BirthedVessel.init(
  {
    ...baseAttributes,
    birthId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    birthedOn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expectedCompletion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reportedOn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    vesselId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: postgres,
    tableName: 'birthed_vessels',
    underscored: true,
  },
);
