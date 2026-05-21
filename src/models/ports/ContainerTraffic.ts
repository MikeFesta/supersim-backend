import { DataTypes } from '@sequelize/core';
import { postgres } from '#root/database/postgres.js';
import { baseAttributes } from '#root/models/BaseAttributes.js';
import { BaseModel } from '#root/models/BaseModel.js';
import type { ContainerTrafficInterface } from '#root/common/ports/ContainerTraffic.js';

export class ContainerTraffic extends BaseModel<ContainerTraffic> implements ContainerTrafficInterface {
  declare date: Date;
  declare terminalId: number;
  declare importCount: number;
  declare exportCount: number;

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

ContainerTraffic.init(
  {
    ...baseAttributes,
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    terminalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    importCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exportCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: postgres,
    tableName: 'container_traffic',
    underscored: true,
  },
);
