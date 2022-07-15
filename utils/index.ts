/**
 * check valid date
 * 
 * @param date string 
 * @returns boolean
 */
export const isDate = function (date: string) {
  return !isNaN(Date.parse(date));
};

/**
 * remove vietnamese accents
 * 
 * @param text 
 * @returns 
 */
export const toNormalForm = (text: string) => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
};

/**
 * get start & end time in a date
 * 
 * @param date (options) If not provided, the current date will be taken
 * @returns object { startDate: Date, endDate: Date }
 */
export const getStartEndDate = (
  date?: Date
): { startDate: Date; endDate: Date } => {
  const selectedDate = date || new Date();
  const startDate = new Date(selectedDate.setUTCHours(0, 0, 0, 0));
  const endDate = new Date(selectedDate.setUTCHours(23, 59, 59, 999));

  return { startDate, endDate };
};

/**
 * get start & end date in a week
 * 
 * @param date (options) If not provided, the current date will be taken
 * @returns object { startWeekDate: Date, endWeekDate: Date }
 */
export const getStartEndWeek = (date?: Date) => {
  const selectedDate = date || new Date();

  const startWeekDate = new Date(
    selectedDate.setDate(selectedDate.getDate() - selectedDate.getDay())
  ).setUTCHours(0, 0, 0, 0);

  const endWeekDate = new Date(
    selectedDate.setDate(selectedDate.getDate() - selectedDate.getDay() + 7)
  ).setUTCHours(23, 59, 59, 999);

  return {
    startWeekDate: new Date(startWeekDate),
    endWeekDate: new Date(endWeekDate),
  };
};

/**
 *  * get start & end date in a month
 * 
 * @param date (options) If not provided, the current date will be taken
 * @returns object { startMonthDate: Date, endMonthDate: Date }
 */
export const getStartEndMonth = (date?: Date) => {
  const selectedDate = date || new Date();

  const startMonthDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  );
  const endMonthDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  );

  return {
    startMonthDate,
    endMonthDate: new Date(endMonthDate.setUTCHours(23, 59, 59, 999)),
  };
};
