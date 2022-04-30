import { makeModule } from '@di/container';
import { makeHealthCheckController } from '@presentation/rest/controller/health-controller';
import { makeItemController } from '@presentation/rest/controller/item-controller';
import { makeRestaurantController } from '@presentation/rest/controller/restaurant-controller';

const presentationModule = makeModule('presentation', async ({ container }) => {
  container.build(makeRestaurantController);
  container.build(makeItemController);
  container.build(makeHealthCheckController);
});

export { presentationModule };
