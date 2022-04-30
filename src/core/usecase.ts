import { ResultSuccess, ResultError } from '@core/result';

type UseCase<Input, Output> = (data: Input) => Promise<ResultSuccess<Output> | ResultError>;

export { UseCase };
