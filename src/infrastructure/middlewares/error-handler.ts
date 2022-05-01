import { createErrorResult } from '@core/result';

const errorHanlder = (error, req, res, next) => {
  if (!(error instanceof Error)) next(error);
  else {
    const output = createErrorResult(new Error('Internal error'));
    next(output);
  }
};

export { errorHanlder };
