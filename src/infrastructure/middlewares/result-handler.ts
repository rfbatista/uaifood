import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const resultHanlder = (output, req: Request, res: Response, next: NextFunction) => {
  if (output.isSuccess && output.data && req.method === 'POST')
    return res.status(StatusCodes.CREATED).json(output.data);
  if (output.isError) return res.status(StatusCodes.BAD_REQUEST).json(output.data);
  return res.status(StatusCodes.OK).json(output.data);
};

export { resultHanlder };
