export const get = (props, obj) => {
  return props.reduce((accumulator, prop) => {
    return (accumulator && accumulator[prop]) || undefined;
  }, obj);
};
