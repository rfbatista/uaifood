import { Entity, EntityType, makeEntity } from '../entity';
import { createSuccessResult, createErrorResult, ResultSuccess, ResultError } from '@core/result';
import { Culinary } from '@core/domain/value-object/culinary';

type RestaurantType = EntityType & {
  name?: string;
  culinary: Culinary;
};

type RestaurantDTO = RestaurantType & {
  id: string;
  createdAt?: Date;
};

interface Restaurant extends Entity {
  name?: string;
  toDTO: RestaurantDTO;
}

const createRestaurant = makeEntity<RestaurantType, Restaurant>(
  (entity: Entity, props: RestaurantType): ResultSuccess<Restaurant> | ResultError => {
    if (!props?.culinary) return createErrorResult(new Error());
    return createSuccessResult({
      ...entity,
      name: props.name,
      get toDTO() {
        return {
          id: entity.id,
          name: props.name,
          culinary: props.culinary,
          createdAt: entity.createdAt
        };
      },
    });
  },
);

export { RestaurantDTO, createRestaurant, Restaurant };
