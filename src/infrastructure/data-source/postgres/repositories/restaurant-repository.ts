import { Restaurant } from '@core/domain/entities/restaurant';
import {
  RestaurantSchema,
  restaurantToDomain,
  restaurantToSchema,
} from '@infrastructure/data-source/schemas/restaurant-schema';
import { RestaurantRepository } from '@core/ports';
import { createSuccessResult } from '@core/result';
import { DataSource, EntityManager } from 'typeorm';

const makeRestaurantRepository = ({ database }: { database: DataSource }): RestaurantRepository => ({
  async create(entity: Restaurant) {
    const repo = database.getRepository(RestaurantSchema);
    const schema = restaurantToSchema(entity);
    const savedSchema = await repo.save(schema);
    return createSuccessResult(restaurantToDomain(savedSchema));
  },
  async find({ city, distance, culinary, item }) {
    const entities: Restaurant[] = [];
    const manager = new EntityManager(database);
    const schemas = await manager.query(`
      SELECT r.*
      FROM restaurant r
      WHERE (r."deleted_at" IS NULL)
      ${city ? `AND to_tsvector('portuguese', r.city) @@ to_tsquery('${city}:*')` : ''}
      ${
        distance
          ? `AND ST_DistanceSphere(ST_GeomFromGeoJSON(local), 'SRID=4326;POINT(${distance.long} ${
              distance.lat
            })'::geometry) <= ${distance.radius * 1000}`
          : ''
      }
      ${culinary ? `AND to_tsvector('portuguese', r.culinary) @@ to_tsquery('${culinary}:*')` : ''}
      ${
        item
          ? `AND r.id IN (SELECT i.restaurant_id FROM item i WHERE to_tsvector('portuguese', i.name) @@ to_tsquery('${item}:*') )`
          : ''
      }
    `);
    for (const schema of schemas) {
      entities.push(restaurantToDomain(schema));
    }
    return createSuccessResult(entities);
  },
});

export { makeRestaurantRepository };
