import { makeCreateItemUseCase } from '@core/application/usecases/item/createItemUseCase';
import { makeUpdateItemUseCase } from '@core/application/usecases/item/updateItemUseCase';
import { makeCreateRestaurantUseCase } from '@core/application/usecases/restaurant/createRestaurantUseCase';
import { makeListRestaurantUseCase } from '@core/application/usecases/restaurant/listRestaurantUseCase';
import { makeModule } from '@di/container';

const applicationModule = makeModule('Application', async ({ container, asFunction }): Promise<void> => {
  container.register({
    createRestaurantUseCase: asFunction(makeCreateRestaurantUseCase),
    createItemUseCase: asFunction(makeCreateItemUseCase),
    updateItemUseCase: asFunction(makeUpdateItemUseCase),
    listRestaurantUseCase: asFunction(makeListRestaurantUseCase),
  });
});

export { applicationModule };
