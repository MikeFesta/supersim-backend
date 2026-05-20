import { z } from 'zod';

export const SequelizeDbColumnsSchema = z.object({
  id: z.number().int().positive(),
  uuid: z.uuid({ version: 'v7' }),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

// This replaces your manual interface definition
export type SequelizeDbColumns = z.infer<typeof SequelizeDbColumnsSchema>;

export const SequelizeCreationSchema = SequelizeDbColumnsSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
}).partial({
  uuid: true, // Optional because the ORM/Logic will fill it in
});

export type SequelizeCreation = z.infer<typeof SequelizeCreationSchema>;
