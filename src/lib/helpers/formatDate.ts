import dateFormat from "dateformat";

export const formatDate = (dateString: string | number) => {
  const date = new Date(dateString);
  return dateFormat(date, "longDate");
};
