import { format } from "date-fns";

export const formattedDate = (date: string) =>
  format(new Date(date), "MM/dd/yyyy");
