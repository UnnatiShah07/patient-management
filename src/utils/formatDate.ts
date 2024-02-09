export const formatDate = (date: string): string => {
  const inputDate = new Date(date);
  const formatDate = inputDate.getDate() < 10 ? `0${inputDate.getDate()}` : inputDate.getDate();
  const formatMonth = inputDate.getMonth() < 10 ? `0${inputDate.getMonth() + 1}` : inputDate.getMonth() + 1;
  const formattedDate = [inputDate.getFullYear(), formatMonth, formatDate].join("-");
  return formattedDate;
};
