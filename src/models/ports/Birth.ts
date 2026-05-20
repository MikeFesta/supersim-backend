import { DataTypes } from '@sequelize/core';
import { postgres } from '#root/database/postgres.js';
import { baseAttributes } from '#root/models/BaseAttributes.js';
import { BaseModel } from '#root/models/BaseModel.js';
import type { BirthInterface } from '#root/common/ports/Birth.js';
//import type { TerminalInterface } from '#root/common/ports/Terminal.js';

export class Birth extends BaseModel<Birth> implements BirthInterface {
  declare name: string;
  declare terminalId: number;

  // Virtuals

  // Associations

  static async associate() {
    /* CRANES, when ready
    const { Identity } = await import('./Identity.js');
    Account.hasMany(Identity, {
      as: 'identities',
      foreignKey: 'accountId',
    });
    */
  }

  // Instance Methods
  // none

  // Static Methods
  // none
}

Birth.init(
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
  },
  {
    sequelize: postgres,
    tableName: 'births',
    underscored: true,
  },
);
