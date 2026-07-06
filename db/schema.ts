import { index, integer, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const links = pgTable(
	"links",
	{
		id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
		clerkUserId: text("clerk_user_id").notNull(),
		shortCode: text("short_code").notNull(),
		url: text("url").notNull(),
		createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
			.defaultNow()
			.notNull(),
	},
	(table) => ({
		shortCodeUnique: uniqueIndex("links_short_code_unique").on(table.shortCode),
		clerkUserIdIdx: index("links_clerk_user_id_idx").on(table.clerkUserId),
	}),
);

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
