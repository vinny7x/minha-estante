import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { books, userBooks, users } from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não definida');
}

const client = postgres(process.env.DATABASE_URL);

export const db = drizzle(client, {
  schema: {
    users,
    books,
    userBooks
  },
  logger: false,
},)

/** 
async function testConnection() {
  try {
    await client`SELECT 1`
    console.log('🟢 Conectado ao banco com sucesso')
  } catch (err) {
    console.error('🔴 Erro ao conectar no banco:', err)
  }
}

testConnection()*/