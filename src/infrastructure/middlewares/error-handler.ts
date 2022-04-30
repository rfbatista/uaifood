import { logger } from '@infrastructure/logger';
import { errorAlias } from '@infrastructure/error/error-alias';
import { ErrorRequestHandler } from 'express';
import { createErrorResult } from '@core/result';

const createContext = (error) => {
  return {
    errorCode: error.code,
    errorName: error.name,
    errorStatus: error.status,
    errorFileName: error.fileName,
    errorLineNumber: error.lineNumber,
    stack: error.stack,
  };
};

const errorHanlder = (error, req, res, next) => {
  if (!(error instanceof Error)) next(error);
  else {
    const output = createErrorResult(new Error('Internal error'));
    next(output);
  }
};

export { errorHanlder };
