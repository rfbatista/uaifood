import { UseCase } from '@core/usecase';
import { createSuccessResult, createErrorResult, ResultSuccess } from '@core/result';
import { createCulinary } from '@core/domain/value-object/culinary';
import { createRestaurant, Restaurant, RestaurantDTO } from '@core/domain/entities/restaurant';

type Input = {
  name?: string;
  culinary: string;
  address?: {
    local?: {
      lat: number;
      long: number;
    };
    city: string;
  };
};

type Output = RestaurantDTO;

const makeCreateRestaurantUseCase =
  ({ restaurantRepository }): UseCase<Input, Output> =>
  async (input: Input) => {
    console.log(input);
    const entityResult = createRestaurant({
      name: input?.name,
      culinary: createCulinary(input?.culinary),
      address: input?.address,
    });
    if (entityResult.isError) return createErrorResult(new Error());
    const restaurant = (entityResult as ResultSuccess<Restaurant>).data;
    await restaurantRepository.create(restaurant);
    return createSuccessResult(restaurant?.toDTO());
  };

export { makeCreateRestaurantUseCase, Input as createRestaurantUseCaseInput };
