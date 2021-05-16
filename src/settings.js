import dotenv from 'dotenv';

dotenv.config();
export const config = {
  redis: {
    endpoint: process.env.REDIS_ENDPOINT || 'redis://127.0.0.1:6379'
  }
};
export const { STACK_EXCHANGE_KEY } = process.env;
