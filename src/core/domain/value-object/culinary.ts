enum CulinaryTypeEnum {
  VEGAN = 'vegan',
}

type Culinary = {
  type: CulinaryTypeEnum;
};

const createCulinary = (type: CulinaryTypeEnum): Culinary => {
  return {
    type,
  };
};

export { CulinaryTypeEnum, Culinary, createCulinary };
