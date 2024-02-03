export function secondsToHoursAndMinutes(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  // Ensure that single-digit minutes are formatted with a leading zero
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${hours}:${formattedMinutes}`;
}
