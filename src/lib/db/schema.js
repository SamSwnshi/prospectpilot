import {
  pgTable,
  serial,
  varchar,
  text,
  doublePrecision,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const businessInputs = pgTable("business_inputs", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  keywords: text("keywords"),
  location: varchar("location", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  businessInputId: integer("business_input_id").references(
    () => businessInputs.id
  ),
  name: varchar("name", { length: 100 }),
  email: varchar("email", { length: 100 }),
  phone: varchar("phone", { length: 30 }),
  address: text("address"),
  website: varchar("website", { length: 200 }),
  score: doublePrecision("score"),
  source: varchar("source", { length: 50 }),
});

export const callLogs = pgTable("call_logs", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id").references(() => leads.id),
  outcome: varchar("outcome", { length: 50 }),
  notes: text("notes"),
  timestamp: timestamp("timestamp").defaultNow(),
});
