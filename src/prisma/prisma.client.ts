import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';

const connectionString = process.env.DATABASE_URL as string;

const adapter = new PrismaPg({ connectionString });

// singleton (VERY IMPORTANT for NestJS)
export const prisma = new PrismaClient({
  adapter,
});
