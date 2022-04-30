import { Entity, EntityType, makeEntity } from '../entity';
import { createSuccessResult, createErrorResult, ResultSuccess, ResultError } from '@core/result';
import { Culinary } from '@core/domain/value-object/culinary';
import { Address, AddressDTO, createAddress } from '@core/domain/value-object/address';

type RestaurantDTO = EntityType & {
  name?: string;
  culinary: Culinary;
  address?: AddressDTO;
};

interface Restaurant extends Entity {
  name?: string;
  culinary: Culinary;
  address?: Address;
  toDTO(): RestaurantDTO;
}

const createRestaurant = makeEntity<RestaurantDTO, Restaurant>(
  (entity: Entity, props: RestaurantDTO): ResultSuccess<Restaurant> | ResultError => {
    if (!props?.culinary) return createErrorResult(new Error());
    const restaurant = {
      ...entity,
      name: props.name,
      culinary: props.culinary,
      address: createAddress({ city: props.address?.city, local: props.address?.local }),
      toDTO: (): RestaurantDTO => {
        return {
          id: entity.id,
          name: props.name,
          culinary: props.culinary,
          address: props.address,
          createdAt: entity.createdAt,
        };
      },
    };
    return createSuccessResult(restaurant);
  },
);

export { RestaurantDTO, createRestaurant, Restaurant };
