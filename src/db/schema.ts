import { pgTable, text, timestamp, boolean, primaryKey, numeric } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  username: text("username").unique(),
  realname: text("realname"),
  biography: text("biography").default("Apaixonado por livros 💙"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const books = pgTable('books', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  authors: text('author').notNull(),
  description: text('description'),
  coverUrl: text('cover_url'),
  pages: numeric('pages'),
  createdAt: timestamp("created_at").defaultNow(),
  publishedDate: timestamp('pub_date')
});

export const userBooks = pgTable("user_books", {
  userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }).notNull(),
  bookId: text('book_id').references(() => books.id, { onDelete: 'cascade' }).notNull(),
  status: text('status'),
  rating: numeric('rating', { precision: 2, scale: 1 }),
  review: text('review')
}, (table) => [
  primaryKey({ columns: [table.userId, table.bookId] }),
]);