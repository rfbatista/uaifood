import { makeSchemaFromDomain, Schema } from '@infrastructure/data-source/schema';
import { createItem, Item } from '@core/domain/entities/item';
import { createPrice } from '@core/domain/value-object/price';
import { createMoney, CurrencyEnum } from '@core/domain/value-object/money';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RestaurantSchema } from '@infrastructure/data-source/schemas/restaurant-schema';

type ItemSchemaType = Schema & {
  name: string;
  restaurantId: string;
  price: {
    amount: number;
    currency: string;
  };
};

@Entity('item')
class ItemSchema implements ItemSchemaType {
  @PrimaryColumn({ type: 'uuid' })
  id: string;
  @Column()
  name: string;
  @Column('json')
  price: {
    amount: number;
    currency: string;
  };
  @ManyToOne(() => RestaurantSchema, (item) => item.items)
  @JoinColumn({ name: 'restaurant_id' })
  restaurantId: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
  constructor(props: ItemSchemaType) {
    this.id = props?.id;
    this.name = props?.name;
    this.price = props?.price;
    this.createdAt = props?.createdAt;
    this.updatedAt = props?.updatedAt;
    this.deletedAt = props?.deletedAt;
    this.restaurantId = props?.restaurantId;
  }
}

const itemToSchema = makeSchemaFromDomain<Item, ItemSchema>((domain: Item, schema: Schema): ItemSchema => {
  return new ItemSchema({
    ...schema,
    restaurantId: domain.restaurantId,
    name: domain.name || '',
    price: {
      amount: domain.price.amount(),
      currency: domain.price.currency(),
    },
  });
});

const itemToDomain = (schema: ItemSchema) => {
  return createItem({
    id: schema.id,
    name: schema.name,
    restaurantId: schema.restaurantId,
    price: createPrice(schema.price.amount),
    createdAt: schema.createdAt,
    updatedAt: schema.updatedAt,
    deletedAt: schema.deletedAt,
  });
};

export { ItemSchema, itemToDomain, itemToSchema };
