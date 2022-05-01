import { postgres } from '@infrastructure/data-source/postgres/postgres';
import { makeModule } from '@di/container';

const databaseModule = makeModule('database', async ({ container, asValue, onDisposing }) => {
  const datasource = await postgres.initialize();
  onDisposing(() => datasource.destroy());
  container.register({
    database: asValue(datasource),
  });
});

export { databaseModule };
