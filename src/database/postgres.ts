import 'dotenv/config';
import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';

const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

export const postgres = new Sequelize({
  dialect: PostgresDialect,
  url: connectionString,
  define: {
    timestamps: true,
    underscored: true,
  },
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default postgres;
