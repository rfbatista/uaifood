import crypto from 'crypto';

type UniqueIdentifier = Readonly<string>;

const createUniqueIdentifier = (id?: string): UniqueIdentifier => {
  return id ? Object.freeze(id) : Object.freeze(crypto.randomUUID());
};

export { UniqueIdentifier, createUniqueIdentifier };
