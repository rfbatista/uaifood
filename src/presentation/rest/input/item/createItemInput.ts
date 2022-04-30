import { createItemUseCaseInput } from '@core/application/usecases/item/createItemUseCase';
import { validateRoute } from '@presentation/rest/controller';
import { body } from 'express-validator';

const validateCreateItem = () =>
  validateRoute([body('restaurantId').isUUID(), body('name').isString(), body('price').isNumeric()]);

const mapCreateItemInput = (req): createItemUseCaseInput => {
  return {
    restaurantId: req.body?.restaurantId,
    name: req.body?.name,
    price: req.body?.price,
  };
};

export { mapCreateItemInput, validateCreateItem };
