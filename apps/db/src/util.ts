export const convertToUnixEpoch = (input: string) => {
  let result = Math.floor(new Date(input).getTime() / 1000.0);

  if (isNaN(result)) {
    throw new Error(`Invalid Date Format`);
  } else
    return result;
};
