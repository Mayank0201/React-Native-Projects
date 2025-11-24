export function FormattedDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function CheckRecent(date: Date, days: number) {
  // subtract 'days' from the given date
  const recentDate = new Date(date);
  recentDate.setDate(date.getDate() - days);
  return recentDate;
}
