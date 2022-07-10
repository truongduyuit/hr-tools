export const isDate = function (date: string) {
  return !isNaN(Date.parse(date));
};
