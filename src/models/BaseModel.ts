import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';
import type { SequelizeDbColumns } from '#root/common/Sequelize.js';

export abstract class BaseModel<T extends Model<any, any>>
  extends Model<InferAttributes<T>, InferCreationAttributes<T>>
  implements SequelizeDbColumns
{
  declare id: CreationOptional<number>;
  declare uuid: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date | null>;
  declare updatedAt: CreationOptional<Date>;
}
