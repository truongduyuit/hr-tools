export const isDate = function (date: string) {
  return !isNaN(Date.parse(date));
};

export const toNormalForm = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
