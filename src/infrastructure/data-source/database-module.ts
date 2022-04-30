import { postgres } from '@infrastructure/data-source/postgres/postgres';
import { makeModule } from '@di/container';

const databaseModule = makeModule('data-source', async ({ container, asValue }) => {
  const datasource = await postgres.initialize();
  container.register({
    database: asValue(datasource),
  });
});

export { databaseModule };
