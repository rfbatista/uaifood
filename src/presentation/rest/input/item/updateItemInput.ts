import { updateItemtUseCaseInput } from '@core/application/usecases/item/updateItemUseCase';
import { validateRoute } from '@presentation/rest/controller';
import { body } from 'express-validator';

const validateUpdateItem = () =>
  validateRoute([
    body('id').isUUID(),
    body('restaunrantId').isUUID().optional(),
    body('name').isString(),
    body('price').isNumeric(),
  ]);

const mapUpdateItemInput = (req): updateItemtUseCaseInput => {
  return {
    id: req.body?.id,
    name: req.body?.name,
    price: req.body?.price,
    restauranId: req.body?.restaurantId,
  };
};

export { mapUpdateItemInput, validateUpdateItem };
