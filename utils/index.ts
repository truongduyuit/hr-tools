export const isDate = function (date: string) {
  return !isNaN(Date.parse(date));
};

export const toNormalForm = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const paginationRange = (currentPage: number, totalPage: number) => {
  const arr = [];

  for (var i = currentPage - 2; i <= currentPage + 5; i++) {
    if (i >= 0 && i <= totalPage - 1) {
      arr.push(i);
    }

    if (arr.length >= 5) break;
  }

  return arr;
}