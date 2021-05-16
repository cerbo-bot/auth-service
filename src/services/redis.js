import redis from 'redis';
import { config } from '../settings';

export const client = redis.createClient({
  url: config.redis.endpoint
});
