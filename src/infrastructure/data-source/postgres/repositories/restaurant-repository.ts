import { Restaurant } from '@core/domain/entities/restaurant';
import {
  RestaurantSchema,
  restaurantToDomain,
  restaurantToSchema,
} from '@infrastructure/data-source/schemas/restaurant-schema';
import { RestaurantRepository } from '@core/ports';
import { createSuccessResult } from '@core/result';
import { DataSource } from 'typeorm';

const makeRestaurantRepository = ({ database }: { database: DataSource }): RestaurantRepository => ({
  async create(entity: Restaurant) {
    const repo = database.getRepository(RestaurantSchema);
    const schema = restaurantToSchema(entity);
    const savedSchema = await repo.save(schema);
    return createSuccessResult(restaurantToDomain(savedSchema));
  },
  async find({ city, distance, culinary, item }) {
    const repo = database.getRepository(RestaurantSchema);
    const query = repo
      .createQueryBuilder('restaurant')
      .leftJoinAndMapMany('restaurant.items', 'item', 'item.restaurantId = restaurant.id');
    if (culinary)
      query.orWhere("to_tsvector('simple', restaurant.culinary) @@ to_tsquery(:query)", {
        query: `${culinary}:*`,
      });
    if (city)
      query.orWhere("to_tsvector('simple', restaurant.city) @@ to_tsquery(:query)", {
        query: `${city}:*`,
      });
    const schemas = await query.getMany();
    const entities: Restaurant[] = [];
    for (const schema of schemas) {
      entities.push(restaurantToDomain(schema));
    }
    return createSuccessResult(entities);
  },
});

export { makeRestaurantRepository };
