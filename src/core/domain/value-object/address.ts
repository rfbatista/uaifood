import { Coordinate, CoordinateDTO, createCoordinate } from '@core/domain/value-object/coordinates';

type AddressDTO = {
  city?: string;
  local?: CoordinateDTO;
};

interface Address {
  local?: Coordinate;
  city?: string;
}

const createAddress = (props: AddressDTO): Address => {
  return {
    local: props?.local && createCoordinate(props.local),
    city: props?.city,
  };
};

export { createAddress, AddressDTO, Address };
