import { client } from '../services/redis';
import logger from '../services/logger';

export const apiCache = (req, res, next) => {
  const dataId = req.originalUrl;

  client.get(dataId, (err, data) => {
    if (err) {
      logger.error(err);
      next(err);
    }
    if (data !== null) {
      logger.info('Fetching data from redis.');
      res.status(200).json({ message: JSON.parse(data) });
    } else {
      next();
    }
  });
};

// TODO: Implement POST method caching later.
// export const queryCache = (req, res, next) => {
// };
