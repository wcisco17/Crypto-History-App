export const convertToUnixEpoch = (input: string) => {
  return Math.floor(new Date(input).getTime() / 1000.0);
};
