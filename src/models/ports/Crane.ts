import { DataTypes } from '@sequelize/core';
import { postgres } from '#root/database/postgres.js';
import { baseAttributes } from '#root/models/BaseAttributes.js';
import { BaseModel } from '#root/models/BaseModel.js';
import type { CraneInterface } from '#root/common/ports/Crane.js';

export class Crane extends BaseModel<Crane> implements CraneInterface {
  declare name: string;
  declare terminalId: number;
  declare birthId: number;
  declare statusId: number;

  // Virtuals

  // Associations
  static async associate() {
    // None
  }

  // Instance Methods
  // none

  // Static Methods
  // none
}

Crane.init(
  {
    ...baseAttributes,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    terminalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    birthId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: postgres,
    tableName: 'cranes',
    underscored: true,
  },
);
