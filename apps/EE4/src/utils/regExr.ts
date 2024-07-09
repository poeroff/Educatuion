export const getStringToArrRegExr = (value: string, regExr = /,\s*|\s+/) => {
  return value.split(regExr).map(string => string.trim());
};
