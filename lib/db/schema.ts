import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const personalization = pgTable("personalization", {
  id: serial("id").primaryKey(),
  userId: serial("user_id"),
  customTheme: varchar("custom-theme", { length: 128 }),
});
