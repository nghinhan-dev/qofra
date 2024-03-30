export function displayTime(utcTimeString) {
  console.log("utcTimeString:", utcTimeString);
  let str = utcTimeString.toString();

  const date = new Date(str);
  // Adjust to GMT+7
  date.setHours(date.getHours() + 7);
  // Get the date string
  return date.toDateString();
}
