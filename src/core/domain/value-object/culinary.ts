type Culinary = {
  type: string;
};

const createCulinary = (type: string): Culinary => {
  return {
    type,
  };
};

export { Culinary, createCulinary };
