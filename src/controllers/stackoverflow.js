import Stackexchange from 'stackexchange';
import _ from 'lodash';
import { client } from '../services/redis';
import logger from '../services/logger';
import { STACK_EXCHANGE_KEY } from '../settings';

const Options = { version: 2.2 };
const context = new Stackexchange(Options);

const Filter = {
  key: STACK_EXCHANGE_KEY,
  pagesize: 10,
  sort: 'activity',
  order: 'asc',
  site: 'stackoverflow',
};

const queryLookup = (query, callback) => {
  Filter.intitle = query;
  context.search.search(Filter, (err, results) => {
    callback(err, results);
  });
};

export const stackoverflowSearch = async (req, res) => {
  try {
    queryLookup(req.params.q, (err, results) => {
      if (err) throw new Error('some error');
      const updatedResponse = [];
      _.forEach(results.items, (resultItem) => {
        const newResultItem = _.pick(resultItem, [
          'tags',
          'is_answered',
          'accepted_answer_id',
          'answer_count',
          'title',
        ]);
        newResultItem.accepted_answer_id = newResultItem.accepted_answer_id
          ? `https://stackoverflow.com/a/${newResultItem.accepted_answer_id}`
          : null;
        _.set(newResultItem, 'accepted_answer', newResultItem.accepted_answer_id);
        _.unset(newResultItem, 'accepted_answer_id');
        updatedResponse.push(newResultItem);
      });
      client.setex(req.originalUrl, 3600, JSON.stringify(updatedResponse));
      res.status(200).json({ message: updatedResponse });
    });
  } catch (error) {
    logger.error(error);
    res.status(404).json({ error });
  }
};
