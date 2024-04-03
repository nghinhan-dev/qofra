export function displayTime(utcTimeString) {
  const date = new Date(utcTimeString);
  // Adjust to GMT+7
  date.setHours(date.getHours() + 7);
  // Get the date string
  return date.toDateString();
}

export function abbreviatedName(name) {
  return name
    .split(" ")
    .map((word, index) => {
      if (index === name.split(" ").length - 1) {
        return word; // Keep the last word unchanged
      }
      return `${word.charAt(0)}.`;
    })
    .join(" ");
}
