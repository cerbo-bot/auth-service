import os from 'os';
import logger from '../services/logger';

logger.info('checking health status');
export const indexPage = (req, res) => res.send(`Server Up and running from: ${os.hostname}`);
