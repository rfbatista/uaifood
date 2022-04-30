type CoordinateDTO = {
  lat: number;
  long: number;
};

interface Coordinate {
  lat: number;
  long: number;
}

const createCoordinate = ({ lat, long }: CoordinateDTO): Coordinate => {
  return {
    lat: lat,
    long: long,
  };
};

export { createCoordinate, Coordinate, CoordinateDTO };
