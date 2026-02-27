import { numeric, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid('id').primaryKey().defaultRandom(),
    discordId: text("discord_id").unique(),
    username: text("username").unique(),
    bio: text('biography').default('Apaixonado por livros 💙'),
    realname: text("realname"),
    email: text("email").unique(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const books = pgTable('books', {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    authors: text('author').notNull(),
    description: text('description'),
    coverUrl: text('cover_url'),
    createdAt: timestamp("created_at").defaultNow(),
    publishedDate: timestamp('pub_date')
});

export const userBooks = pgTable("user_books", {
    userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
    bookId: text('book_id').references(() => books.id, { onDelete: 'cascade' }).notNull(),
    status: text('status'),
    rating: numeric('rating', { precision: 2, scale: 1 }),
    review: text('review')
}, (table) => [
    primaryKey({ columns: [table.userId, table.bookId] }),
]);