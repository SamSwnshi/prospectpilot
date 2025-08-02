import {
  pgTable,
  serial,
  varchar,
  text,
  doublePrecision,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";


export const businessInputs = pgTable('business_inputs',{
    id: serial('id').primaryKey(),
    name: varchar('name',{length: 100}).notNull(),
    description: text('description'),
})