import * as dotenv from 'dotenv';

dotenv.config();

export const envConfig = {
  DB_TYPE: process.env.DB_TYPE || 'postgres',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
  DB_USERNAME: process.env.DB_USERNAME || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_DATABASE: process.env.DB_DATABASE || 'test',
  DB_SYNCHRONIZE: process.env.DB_SYNCHRONIZE === 'true',
};
