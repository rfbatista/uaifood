interface Result {
  readonly isError: boolean;
  readonly isSuccess: boolean;
}

interface ResultError extends Result {
  readonly data: unknown;
}

interface ResultSuccess<T> extends Result {
  readonly data: T;
}

const createErrorResult = (error: Error): ResultError => {
  const message = error.message;
  return {
    isError: true,
    isSuccess: false,
    data: {
      error: [{ message }],
    },
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
