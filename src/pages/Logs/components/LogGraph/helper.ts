export const getCurrentTimeInSeconds = () => {
  // Get the current time in milliseconds
  const currentTimeInMillis = new Date().getTime();

  // Convert milliseconds to seconds
  const currentTimeInSeconds = Math.floor(currentTimeInMillis / 1000);

  return currentTimeInSeconds;
};
