import { createRestaurant, Restaurant } from '@core/domain/entities/restaurant';
import { makeSchemaFromDomain, Schema } from '@infrastructure/data-source/schema';
import { createCulinary } from '@core/domain/value-object/culinary';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  Column,
  Entity,
  OneToMany,
  Index,
} from 'typeorm';
import { ItemSchema } from '@infrastructure/data-source/schemas/item-schema';
import { Point } from 'geojson';
import { ResultSuccess } from '@core/result';

type RestaurantSchemaType = Schema & {
  name: string;
  culinary: string;
  local?: Point;
  city?: string;
  items?: ItemSchema[];
  document_with_weights?: unknown;
};

@Entity('restaurant')
class RestaurantSchema implements RestaurantSchemaType {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column({ nullable: true })
  name: string;
  @Column()
  @Index({ fulltext: true })
  culinary: string;
  @OneToMany(() => ItemSchema, (item) => item.restaurant_id)
  items?: ItemSchema[];
  @Column({ type: 'json', nullable: true })
  local?: Point;
  @Column({ nullable: true })
  city?: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;

  constructor(props: RestaurantSchema) {
    this.id = props?.id;
    this.name = props?.name;
    this.city = props?.city;
    this.local = props?.local;
    this.culinary = props?.culinary;
    this.createdAt = props?.createdAt;
    this.updatedAt = props?.updatedAt;
    this.deletedAt = props?.deletedAt;
  }
}

const restaurantToSchema = makeSchemaFromDomain<Restaurant, RestaurantSchemaType>(
  (domain: Restaurant, schema: Schema): RestaurantSchemaType => {
    return new RestaurantSchema({
      ...schema,
      name: domain.name || '',
      local: domain.address?.local && {
        type: 'Point',
        coordinates: [domain.address?.local?.long, domain.address?.local?.lat],
      },
      city: domain.address?.city,
      culinary: domain.culinary.type,
    });
  },
);

const restaurantToDomain = (schema: RestaurantSchemaType) => {
  const restaurant = createRestaurant({
    id: schema.id,
    name: schema.name,
    culinary: createCulinary(schema.culinary),
    address: {
      local: schema.local && { lat: schema.local?.coordinates[1], long: schema.local?.coordinates[0] },
      city: schema?.city,
    },
    createdAt: schema.createdAt,
    updatedAt: schema.updatedAt,
    deletedAt: schema.deletedAt,
  });
  return (restaurant as ResultSuccess<Restaurant>).data;
};

export { RestaurantSchema, restaurantToDomain, restaurantToSchema, RestaurantSchemaType };
