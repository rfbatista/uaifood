import { ApplicationRequest } from '@infrastructure/middlewares/request-Id';
import { asValue, AwilixContainer } from 'awilix';
import { NextFunction, Response } from 'express';

type ScopedRequest = ApplicationRequest & {
  container?: AwilixContainer;
};

const requestContainer = (container: AwilixContainer) => (req: ScopedRequest, res: Response, next: NextFunction) => {
  const scopedContainer = container.createScope();

  scopedContainer.register({
    requestId: asValue(req.id),
  });

  req.container = scopedContainer;
  next();
};

export { requestContainer, ScopedRequest };
