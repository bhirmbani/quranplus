import dayjs from "dayjs";

export const formatDate = (
  date: Date,
  options?: Intl.DateTimeFormatOptions
) => {
  // const options: Intl.DateTimeFormatOptions = {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // };
  return date.toLocaleDateString("id-ID", options);
};

export const incrementTime = (
  date: Date,
  value: number,
  type: dayjs.ManipulateType
) => {
  return dayjs(date).add(value, type);
};

export const decrementTime = (
  date: Date,
  value: number,
  type: dayjs.ManipulateType
) => {
  return dayjs(date).subtract(value, type);
};

export const formatDateDayJs = (date: Date, format: string = "D/M/YY") => {
  return dayjs(date).format(format);
};
