import { UseCase } from '@core/usecase';
import { createErrorResult, ResultSuccess, createSuccessResult } from '@core/result';
import { Restaurant, RestaurantDTO } from '@core/domain/entities/restaurant';

type Input = {
  city?: string;
  distance?: { lat: number; long: number; radius: number };
  culinary?: string;
  item?: string;
};

type Output = RestaurantDTO;

const makeListRestaurantUseCase =
  ({ restaurantRepository }): UseCase<Input, Output> =>
  async (input: Input) => {
    const restaurantsOrError = await restaurantRepository.find({
      city: input?.city,
      distance: input?.distance,
      culinary: input?.culinary,
      item: input?.item,
    });
    if (restaurantsOrError.isError) return createErrorResult(new Error('Couldnt find restaurant'));
    const dtos: RestaurantDTO[] = [];
    (restaurantsOrError as ResultSuccess<Restaurant[]>).data.forEach((restaurant) => {
      return dtos.push(restaurant.toDTO());
    });
    return createSuccessResult(dtos);
  };

export { makeListRestaurantUseCase, Input as listRestaurantUseCaseInput };
