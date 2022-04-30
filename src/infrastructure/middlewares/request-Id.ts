import { NextFunction, Request, Response } from 'express';
import { v4 } from 'uuid';

type ApplicationRequest = Request & {
  id?: string;
};

const requestId =
  (idProvider = v4): ((req: ApplicationRequest, res: Response, next: NextFunction) => void) =>
  (req: ApplicationRequest, res: Response, next: NextFunction) => {
    req.id = idProvider();

    next();
  };

export { requestId, ApplicationRequest };
