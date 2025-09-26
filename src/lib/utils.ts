export const isValidId = (id: string): boolean => {
  return /^[1-9]\d*$/.test(id);
};
