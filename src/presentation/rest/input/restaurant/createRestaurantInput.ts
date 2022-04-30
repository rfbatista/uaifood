import { createRestaurantUseCaseInput } from '@core/application/usecases/restaurant/createRestaurantUseCase';
import { validateRoute } from '@presentation/rest/controller';
import { body } from 'express-validator';

const validateCreateRestaurant = () =>
  validateRoute([
    body('culinary').isString(),
    body('name').isString().optional(),
    body('city').isString().optional(),
    body('local.lat').isNumeric().if(body('local.long').exists()).optional(),
    body('local.long').isNumeric().if(body('local.lat').exists()).optional(),
  ]);

const mapCreateRestaurantInput = (req): createRestaurantUseCaseInput => {
  return {
    name: req.body.name,
    culinary: req.body.culinary,
    address: {
      city: req.body?.city,
      local: req.body?.local,
    },
  };
};

export { mapCreateRestaurantInput, validateCreateRestaurant };
