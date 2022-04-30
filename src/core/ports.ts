import { Item } from '@core/domain/entities/item';
import { Restaurant } from '@core/domain/entities/restaurant';
import { ResultSuccess, ResultError } from '@core/result';

interface RestaurantRepository {
  create(entity: Restaurant): Promise<ResultSuccess<Restaurant> | ResultError>;
  find(props: {
    city?: string;
    distance?: { lat: number; long: number; radius: number };
    culinary?: string;
    item?: string;
  }): Promise<ResultSuccess<Restaurant[]> | ResultError>;
}

interface ItemRepository {
  create(entity: Item): Promise<ResultSuccess<Item> | ResultError>;
  update(entity: Item): Promise<ResultSuccess<Item> | ResultError>;
  findById(id: string): Promise<ResultSuccess<Item> | ResultError>;
}

interface CorePorts {
  itemRepository: ItemRepository;
  restaurantRepository: RestaurantRepository;
}

export { RestaurantRepository, ItemRepository, CorePorts };
