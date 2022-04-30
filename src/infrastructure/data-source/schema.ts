import { Entity } from '@core/domain/entity';

interface Schema {
  id: string;
  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
}

type EntityCreateType<T, M> = (entity: T, schema: Schema) => M;

function makeSchemaFromDomain<Domain extends Entity, EntitySchema>(
  create: EntityCreateType<Domain, EntitySchema>,
): (entity: Entity) => EntitySchema {
  function entity(entity: Entity) {
    return create(entity as Domain, {
      id: entity.id,
      createdAt: entity?.createdAt,
      updatedAt: entity?.updatedAt,
      deletedAt: entity?.deletedAt,
    });
  }
  return entity;
}

export { Schema, makeSchemaFromDomain };
