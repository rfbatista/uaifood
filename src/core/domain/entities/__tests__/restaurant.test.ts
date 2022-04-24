import { CulinaryTypeEnum, Culinary } from '@core/domain/value-object/culinary';
import { createRestaurant } from '@core/domain/entities/restaurant';

describe('Restaurant entity', () => {
  it('should return error if undefined culinary type is provided', () => {
    const result = createRestaurant({ culinary: undefined as unknown as Culinary });
    expect(result.isError).toBeTruthy();
  });
  it('should return a restaurant entity', () => {
    const result = createRestaurant({ culinary: { type: CulinaryTypeEnum.VEGAN } });
    expect(result.isSuccess).toBeTruthy();
  });
});
