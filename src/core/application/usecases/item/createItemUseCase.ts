import { UseCase } from '@core/usecase';
import { createSuccessResult, ResultSuccess, createErrorResult } from '@core/result';
import { RestaurantDTO } from '@core/domain/entities/restaurant';
import { ItemRepository } from '@core/ports';
import { createItem, Item } from '@core/domain/entities/item';
import { createPrice } from '@core/domain/value-object/price';

type Input = {
  restaurantId: string;
  name: string;
  price: number;
};

type Output = RestaurantDTO;

function makeCreateItemUseCase({ itemRepository }: { itemRepository: ItemRepository }): UseCase<Input, Output> {
  const execute = async (input: Input) => {
    const entityResult = createItem({
      restaurantId: input.restaurantId,
      name: input.name,
      price: createPrice(input.price),
    });
    if (entityResult.isError) return createErrorResult(new Error('Error creating item'));
    const item = (entityResult as ResultSuccess<Item>).data;
    await itemRepository.create(item);
    return createSuccessResult(item?.toDTO);
  };
  return execute;
}

export { makeCreateItemUseCase, Input as createItemUseCaseInput };
