import express from 'express';
import { stackoverflowSearch } from '../controllers';
import { queryValidator, apiCache } from '../middleware';

const searchRouter = express.Router();

searchRouter.get('/:q', queryValidator, apiCache, stackoverflowSearch);

export default searchRouter;
