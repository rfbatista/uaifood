import { handler } from '@di/handler';
import { mapCreateItemInput, validateCreateItem } from '@presentation/rest/input/item/createItemInput';
import { mapUpdateItemInput, validateUpdateItem } from '@presentation/rest/input/item/updateItemInput';
import { Router } from 'express';

const createItemHandler = handler(({ createItemUseCase }) => async (req, res, next) => {
  const input = mapCreateItemInput(req);
  const output = await createItemUseCase(input);
  next(output);
});

const updateItemHandler = handler(({ updateItemUseCase }) => async (req, res, next) => {
  const input = mapUpdateItemInput(req);
  const output = await updateItemUseCase(input);
  next(output);
});

const makeItemController = ({ apiRouter }: { apiRouter: Router }) => {
  const router = Router();
  router.post('/v1/item', validateCreateItem(), createItemHandler);
  router.put('/v1/item', validateUpdateItem(), updateItemHandler);
  apiRouter.use(router);
};

export { makeItemController };
