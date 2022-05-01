import { listRestaurantUseCaseInput } from '@core/application/usecases/restaurant/listRestaurantUseCase';
import { validateRoute } from '@presentation/rest/controller';
import { query } from 'express-validator';

const validateListRestaurant = () =>
  validateRoute([
    query('culinary').isString().optional(),
    query('city').isString().optional(),
    query('item').isString().optional(),
    query('distancelat').isNumeric().if(query('distancelong').exists()).if(query('distanceradius').exists()).notEmpty(),
    query('distancelong').isNumeric().if(query('distancelat').exists()).if(query('distanceradius').exists()).notEmpty(),
    query('distanceradius').isNumeric().if(query('distancelong').exists()).if(query('distancelat').exists()).notEmpty(),
  ]);

const mapListRestaurantInput = (req): listRestaurantUseCaseInput => {
  return {
    culinary: req.query?.culinary,
    city: req.query?.city,
    item: req.query?.item,
    distance: req.query?.distancelat && {
      lat: req.query?.distancelat,
      long: req.query?.distancelong,
      radius: req.query?.distanceradius,
    },
  };
};

export { mapListRestaurantInput, validateListRestaurant };
