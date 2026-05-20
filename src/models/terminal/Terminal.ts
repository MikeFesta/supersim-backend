import { DataTypes } from '@sequelize/core';
import { postgres } from '#root/database/postgres.js';
import { baseAttributes } from '#root/models/BaseAttributes.js';
import { BaseModel } from '#root/models/BaseModel.js';
import type { TerminalInterface } from '#root/common/Terminal.js';

export class Terminal extends BaseModel<Terminal> implements TerminalInterface {
  declare name: string;

  // Virtuals

  // Associations

  static async associate() {
    /*
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
