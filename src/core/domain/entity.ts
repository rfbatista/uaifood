import { createUniqueIdentifier, UniqueIdentifier } from '@core/domain/value-object/unique-identifier';
import { ResultError, ResultSuccess } from '@core/result';

type EntityType = {
  id?: string;
  updatedAt?: Date;
  deletedAt?: Date;
  createdAt?: Date;
};

type Entity = {
  readonly id: UniqueIdentifier;
  updatedAt?: Date;
  deletedAt?: Date;
  readonly createdAt?: Date;
};

type EntityCreateType<T, M> = (entity: Entity, data: T) => ResultSuccess<M> | ResultError;

function makeEntity<T, M>(create: EntityCreateType<T, M>): (data: EntityType & T) => ResultSuccess<M> | ResultError {
  function entity({ id, updatedAt, deletedAt, createdAt, ...props }: EntityType & T) {
    return create({ id: createUniqueIdentifier(id), updatedAt, deletedAt, createdAt } as Entity, props as T);
  }
  return entity;
}

export { EntityType, Entity, makeEntity };
