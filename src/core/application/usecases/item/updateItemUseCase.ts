import { UseCase } from '@core/usecase';
import { createSuccessResult, createErrorResult, ResultSuccess } from '@core/result';
import { RestaurantDTO } from '@core/domain/entities/restaurant';
import { ItemRepository } from '@core/ports';
import { Item } from '@core/domain/entities/item';

type Input = {
  id: string;
  name?: string;
  price?: number;
};

type Output = RestaurantDTO;

function makeUpdateItemUseCase({ itemRepository }: { itemRepository: ItemRepository }): UseCase<Input, Output> {
  const execute = async (input: Input) => {
    const itemOrError = await itemRepository.findById(input.id);
    if (itemOrError.isError) return createErrorResult(new Error('Couldn`t find item'));
    const item = (itemOrError as ResultSuccess<Item>).data;
    if (input.name) item.name = input.name;
    if (input.price) item.price.updateAmount(input.price);
    await itemRepository.update(item);
    return createSuccessResult(item?.toDTO);
  };
  return execute;
}

export { makeUpdateItemUseCase, Input as updateItemtUseCaseInput };
