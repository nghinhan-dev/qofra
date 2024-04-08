import Icons from "../components/Icon/Icon";

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

export function displayStatus(status) {
  switch (status) {
    case "Ongoing":
      return (
        <p className="status d__flex status__ongoing">
          <Icons name={"Timer"} size={13} /> Ongoing
        </p>
      );
    case "Done":
      return (
        <p className="status d__flex status__done">
          <Icons name={"CircleCheck"} size={13} /> Complete
        </p>
      );
    case "Overdue":
      return (
        <p className="status d__flex status__overdue">
          <Icons name={"OctagonX"} size={13} />
          Overdue
        </p>
      );
    default:
      break;
  }
}
