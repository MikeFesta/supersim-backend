import { DataTypes } from '@sequelize/core';
import { postgres } from '#root/database/postgres.js';
import { baseAttributes } from '#root/models/BaseAttributes.js';
import { BaseModel } from '#root/models/BaseModel.js';
import type { VesselInterface } from '#root/common/ports/Vessel.js';

export class Vessel extends BaseModel<Vessel> implements VesselInterface {
  declare cargoCommodity: string;
  declare name: string;
  declare viaNo: string;

  // Virtuals

  // Associations
  static async associate() {
    // none
  }

  // Instance Methods
  // none

  // Static Methods
  // none
}

Vessel.init(
  {
    ...baseAttributes,
    cargoCommodity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    viaNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: postgres,
    tableName: 'vessels',
    underscored: true,
  },
);
