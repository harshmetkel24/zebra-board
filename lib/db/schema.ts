import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const userDetails = pgTable("user_details", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  totalTests: integer().default(0),
  avgWpm: integer(),
  bestTime: integer(),
});

export const personalization = pgTable("personalization", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => userDetails.userId, {
      onDelete: "cascade",
    }),
  customTheme: varchar("custom-theme", { length: 128 }).default("default"),
});
