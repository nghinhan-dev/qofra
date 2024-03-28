export function displayTime(utcTimeString) {
  const date = new Date(utcTimeString);
  // Adjust to GMT+7
  date.setHours(date.getHours() + 7);
  // Get the date string
  return date.toDateString();
}
