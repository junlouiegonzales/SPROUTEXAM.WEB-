/* eslint-disable @typescript-eslint/no-explicit-any */
export const toEnumToArray = (enume: any): Array<string> => {
  return Object.keys(enume)
    .filter((t) => isNaN(Number(t)) === true)
    .map((t) => enume[t]);
};
