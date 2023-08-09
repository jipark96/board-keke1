export const formatDate = (input) => {
  let date;

  if (typeof input === "string") {
    const correctedDateString = input.replace(" ", "T") + "Z";
    date = new Date(correctedDateString);
  } else if (Array.isArray(input) && input.length >= 3) {
    const year = input[0];
    const month = input[1] - 1;
    const day = input[2];
    const hours = input[3] || 0;
    const minutes = input[4] || 0;
    date = new Date(year, month, day, hours, minutes);
  } else {
    console.error("Invalid input:", input);
    return "";
  }

  const formatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return formatter.format(date);
};
