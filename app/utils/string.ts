export const turnQueryParamsIntoObject = (params: string) => {
  return Object.fromEntries(new URLSearchParams(params));
};

export const ellipsisText = (text: string, maxChar: number = 12) => {
  if (text.length > maxChar) {
    return `${text.substring(0, maxChar)}...`;
  }
  return text;
};
