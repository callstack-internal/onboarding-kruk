export const enumKeys = <T extends {[key: number]: string | number}>(
  enumObj: T,
) => Object.keys(enumObj).filter(v => isNaN(Number(v)));

export const enumValues = <T extends {[key: number]: string | number}>(
  enumObj: T,
) => Object.values(enumObj).filter(v => !isNaN(Number(v)));
