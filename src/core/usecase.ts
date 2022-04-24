import { ResultSuccess, ResultError } from '@core/result';

interface UseCase<Input, Output> {
  execute(data: Input): Promise<ResultSuccess<Output> | ResultError>;
}

export { UseCase };
