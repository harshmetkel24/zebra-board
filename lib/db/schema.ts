import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const userDetails = pgTable("user_details", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  name: text("name"),
  username: text("username"),
  email: text("email"),
  totalTests: integer().default(0),
  avgWpm: integer(),
  avgAccuracy: integer(),
  bestWpm: integer(),
  customTheme: varchar("custom-theme", { length: 128 }).default("default"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const speedTestResults = pgTable("speed_test_results", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userDetails.userId, {
      onDelete: "cascade",
    }),
  wpm: integer().notNull(),
  accuracy: integer().notNull(),
  testDuration: integer().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
