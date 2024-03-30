import { addDays, isMonday } from "date-fns";

export function dueDateCalculator(date, scope) {
  const foundDate = new Date(date);

  if (isMonday(foundDate)) {
    if (scope === "safety" || scope === "man") {
      return addDays(foundDate, 11);
    } else {
      return addDays(foundDate, 9);
    }
  } else {
    if (scope === "safety" || scope === "man") {
      return addDays(foundDate, 23);
    } else {
      return addDays(foundDate, 18);
    }
  }
}
