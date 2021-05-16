import express from 'express';
import searchRouter from './search';
import { indexPage, messagePage, hackerNews } from '../controllers';
import { modifyMessage, apiCache } from '../middleware';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/news', apiCache, hackerNews);
indexRouter.post('/messages', modifyMessage, messagePage);
indexRouter.use('/search', searchRouter);

export default indexRouter;
