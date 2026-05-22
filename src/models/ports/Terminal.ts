import { DataTypes } from '@sequelize/core';
import { postgres } from '#root/database/postgres.js';
import { baseAttributes } from '#root/models/BaseAttributes.js';
import { BaseModel } from '#root/models/BaseModel.js';
import type { BirthInterface } from '#root/common/ports/Birth.js';
import type { TerminalInterface } from '#root/common/ports/Terminal.js';
import { ContainerTrafficInterface } from '#root/common/ports/ContainerTraffic.js';

export class Terminal extends BaseModel<Terminal> implements TerminalInterface {
  declare name: string;
  declare births: BirthInterface[];
  declare containerTraffic: ContainerTrafficInterface;

  // Virtuals

  // Associations
  static async associate() {
    const { Birth } = await import('#root/models/ports/Birth.js');
    Terminal.hasMany(Birth, {
      as: 'births',
      foreignKey: 'terminalId',
    });

    const { ContainerTraffic } = await import('#root/models/ports/ContainerTraffic.js');
    Terminal.hasMany(ContainerTraffic, {
      as: 'containerTraffic',
      foreignKey: 'terminalId',
    });
  }

  // Instance Methods
  // none

  // Static Methods
  // none
}

Terminal.init(
  {
    ...baseAttributes,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: postgres,
    tableName: 'terminals',
    underscored: true,
  },
);
