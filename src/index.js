'use strict';

import Express from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import routing from './routing';
import './mongodb';

const PORT = config.get('http.port');

export default () => {
  const app = new Express();
  app.use(bodyParser.json());
  app.use(cookieParser());

  routing(app);

  app.use((error, req, res, next) => {
    if (error.name === 'UnauthorizedError') {
      next();
    } else {
      console.error(error);
    }
  });

  app.use((req, res) => {
    res.status(404).send();
  });

  app.listen(PORT, () => console.log(`server up on port ${PORT}`));
}
