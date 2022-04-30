import {
  createRestaurantUseCaseInput,
  makeCreateRestaurantUseCase,
} from '@core/application/usecases/restaurant/createRestaurantUseCase';
import { RestaurantRepository } from '@core/ports';

describe('Create Restaurant Use Case', () => {
  const input: createRestaurantUseCaseInput = { name: 'test', culinary: 'vegan' };
  const create = jest.fn().mockResolvedValueOnce('fake user');
  const restaurantRepository: RestaurantRepository = { create };
  const useCase = makeCreateRestaurantUseCase({ restaurantRepository: restaurantRepository });
  it('should call create method from repository', async () => {
    await useCase(input);
    expect(create).toBeCalled();
  });
});
