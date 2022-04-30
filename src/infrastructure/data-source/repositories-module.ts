import { makeRestaurantRepository } from '@infrastructure/data-source/postgres/repositories/restaurant-repository';
import { makeModule } from '@di/container';
import { makeItemRepository } from '@infrastructure/data-source/postgres/repositories/item-repository';

const repositoriesModule = makeModule('data-source', async ({ container, asFunction, asValue }) => {
  container.register({
    restaurantRepository: asFunction(makeRestaurantRepository),
    itemRepository: asFunction(makeItemRepository),
  });
});

export { repositoriesModule };
