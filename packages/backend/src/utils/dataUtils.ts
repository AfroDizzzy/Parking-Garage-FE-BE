export const formatDate = (date: Date | string): string => {
  return new Date(date).toISOString().split("T")[0] ?? "";
};

export const isDateInPast = (date: string): boolean => {
  const bookingDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return bookingDate < today;
};

export const isDateInRange = (
  date: string,
  startDate: Date,
  endDate: Date
): boolean => {
  const checkDate = new Date(date);
  return checkDate >= startDate && checkDate <= endDate;
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const isValidDateFormat = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;

  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
};
