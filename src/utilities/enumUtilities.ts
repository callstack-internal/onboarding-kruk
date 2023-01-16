export const enumKeys = <T extends {[key: number]: string | number}>(
  enumObj: T,
) => Object.keys(enumObj).filter(v => isNaN(Number(v)));

export const enumValues = <T extends {[key: number]: string | number}>(
  enumObj: T,
) => {
  const values = Object.values(enumObj);
  const numericValues = values.filter(v => {
    const res = !isNaN(Number(v));
    return res;
  });
  if (numericValues.length === 0) return values;
  return numericValues;
};
