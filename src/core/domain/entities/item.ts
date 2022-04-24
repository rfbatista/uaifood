import { Price } from '@core/domain/value-object/price';
import { createSuccessResult, ResultSuccess, ResultError } from '@core/result';
import { Entity, EntityType, makeEntity } from '../entity';

type ItemType = EntityType & {
  name?: string;
  price: Price;
};

interface Item extends Entity {
  name?: string;
  readonly price?: Price;
}

const createItem = makeEntity((entity, props: ItemType): ResultSuccess<Item> | ResultError => {
  return createSuccessResult({
    ...entity,
    name: props?.name,
    get price() {
      return props?.price;
    },
  });
});

export { ItemType, Item, createItem };
