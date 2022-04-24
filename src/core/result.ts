interface Result<Data> {
  readonly isError: boolean;
  readonly isSuccess: boolean;
  readonly data: Data;
  readonly error?: Error;
}

interface ResultError extends Result<null> {}

interface ResultSuccess<T> extends Result<T>{}

const createErrorResult = (error: Error): ResultError => {
  return {
    isError: true,
    isSuccess: false,
    data: null,
    error,
  };
};

function createSuccessResult<T>(data: T): ResultSuccess<T> {
  return {
    isError: false,
    isSuccess: true,
    data,
  };
}

export { ResultSuccess, ResultError, createErrorResult, createSuccessResult };
