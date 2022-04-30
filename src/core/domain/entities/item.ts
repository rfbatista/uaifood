import { Price } from '@core/domain/value-object/price';
import { createSuccessResult, ResultSuccess, ResultError, createErrorResult } from '@core/result';
import { Entity, EntityType, makeEntity } from '../entity';
import { UniqueIdentifier, createUniqueIdentifier } from '@core/domain/value-object/unique-identifier';

type ItemType = EntityType & {
  restaurantId: UniqueIdentifier;
  name?: string;
  price: Price;
};

type ItemDTO = {
  id: string;
  name: string;
  price: number;
};
interface Item extends Entity {
  name?: string;
  readonly restaurantId: UniqueIdentifier;
  readonly price: Price;
  toDTO: ItemDTO;
}

const createItem = makeEntity((entity, props: ItemType): ResultSuccess<Item> | ResultError => {
  if (!props.price) return createErrorResult(new Error('Missing price for item'));
  const restaurantId = createUniqueIdentifier(props.restaurantId);
  const item = {
    ...entity,
    get restaurantId() {
      return restaurantId;
    },
    name: props?.name,
    get price() {
      return props?.price;
    },
    get toDTO() {
      return {
        id: entity.id,
        name: props.name,
        price: props.price.amount(),
        createdAt: entity.createdAt,
      };
    },
  };
  return createSuccessResult(item);
});

export { ItemType, Item, createItem };
