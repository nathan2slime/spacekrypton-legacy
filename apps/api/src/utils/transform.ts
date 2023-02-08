type F<T> = T | any;

export const gqlModelTransform = <T>(data: F<T>) => {
  const trans: F<T> = {};

  Object.keys(data._doc).forEach(el => (trans[el] = data[el]));

  return trans;
};
