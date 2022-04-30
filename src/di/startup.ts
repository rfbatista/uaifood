import { applicationModule } from '@core/application';
import { bootstrap } from '@di/container';
import { databaseModule } from '@infrastructure/data-source/database-module';
import { repositoriesModule } from '@infrastructure/data-source/repositories-module';
import { server } from '@infrastructure/server';
import { presentationModule } from '@presentation/index';

const startup = async (): Promise<void> => {
  await bootstrap([server, databaseModule, repositoriesModule, applicationModule, presentationModule]);
};

export { startup };
