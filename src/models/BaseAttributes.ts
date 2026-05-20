import { DataTypes, fn } from '@sequelize/core';
import { uuidv7 } from 'uuidv7';

export const baseAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv7(),
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
};
