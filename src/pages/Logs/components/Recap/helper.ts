export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map((part) => parseInt(part, 10));
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${formattedHours}:${formattedMinutes}`;
}
