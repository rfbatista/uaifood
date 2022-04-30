import { handler } from '@di/handler';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { DataSource } from 'typeorm';

const getHealthHandler = handler(({ database }: { database: DataSource }) => async (req, res) => {
  if (database.isInitialized) res.status(StatusCodes.OK).json({ message: 'Uaifood is running...' });
  else res.status(StatusCodes.OK).json({ message: 'Server is down :(' });
});

const makeHealthCheckController = ({ apiRouter }: { apiRouter: Router }) => {
  const router = Router();

  router.get('/v1/health-check', getHealthHandler);

  apiRouter.use(router);
};

export { makeHealthCheckController };
