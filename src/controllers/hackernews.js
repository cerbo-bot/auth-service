import axios from 'axios';
import _ from 'lodash';
import logger from '../services/logger';
import { client } from '../services/redis';

export const hackerNews = async (req, res) => {
  try {
    logger.info('Fetching data from Hackernews');
    const response = await axios.get(
      'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    );
    const storiesUrl = 'https://hacker-news.firebaseio.com/v0/item/$.json?print=pretty';
    if (response.status === 200) {
      const stories = [];
      _.forEach(response.data, (id) => {
        stories.push(_.replace(storiesUrl, '$', id));
      });
      client.setex(req.originalUrl, 900, JSON.stringify(stories));
      res.status(200).json({ message: stories });
    }
  } catch (err) {
    logger.error(err);
  }
};
