import { defineConfig } from 'prisma/config';
import dotenv from 'dotenv';

// IMPORTANT: load env manually
dotenv.config();

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
