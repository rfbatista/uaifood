import { handler } from '@di/handler';
import {
  mapCreateRestaurantInput,
  validateCreateRestaurant,
} from '@presentation/rest/input/restaurant/createRestaurantInput';
import {
  mapListRestaurantInput,
  validateListRestaurant,
} from '@presentation/rest/input/restaurant/listRestaurantInput';
import { Router } from 'express';

const createRestaurantHandler = handler(({ createRestaurantUseCase }) => async (req, res, next) => {
  const input = mapCreateRestaurantInput(req);
  const output = await createRestaurantUseCase(input);
  next(output);
});

const getRestaurantListHandler = handler(({ listRestaurantUseCase }) => async (req, res, next) => {
  const input = mapListRestaurantInput(req);
  const output = await listRestaurantUseCase(input);
  next(output);
});

const makeRestaurantController = ({ apiRouter }: { apiRouter: Router }) => {
  const router = Router();
  router.post('/v1/restaurant', validateCreateRestaurant(), createRestaurantHandler);
  router.get('/v1/restaurant?', validateListRestaurant(), getRestaurantListHandler);
  apiRouter.use(router);
};

export { makeRestaurantController };
