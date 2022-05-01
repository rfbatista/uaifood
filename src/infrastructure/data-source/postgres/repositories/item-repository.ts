import { ItemRepository } from '@core/ports';
import { createSuccessResult, createErrorResult } from '@core/result';
import { DataSource, EntityManager } from 'typeorm';
import { Item } from '@core/domain/entities/item';
import { ItemSchema, itemToDomain, itemToSchema } from '@infrastructure/data-source/schemas/item-schema';

const makeItemRepository = ({ database }: { database: DataSource }): ItemRepository => ({
  async create(entity: Item) {
    const repo = database.getRepository(ItemSchema);
    const schema = itemToSchema(entity);
    const savedSchema = await repo.save(schema);
    return createSuccessResult(itemToDomain(savedSchema).data);
  },
  async update(entity: Item) {
    const repo = database.getRepository(ItemSchema);
    const schema = itemToSchema(entity);
    const savedSchema = await repo.save(schema);
    return createSuccessResult(itemToDomain(savedSchema).data);
  },
  async findById(id: string) {
    const manager = new EntityManager(database);
    const schema = await manager.query(`
      SELECT i.*
      FROM item i
      WHERE i.id = '${id}'
    `);
    if (!schema[0]) return createErrorResult(new Error());
    return createSuccessResult(itemToDomain(schema[0]).data);
  },
});

export { makeItemRepository };
