export const turnQueryParamsIntoObject = (params: string) => {
  return Object.fromEntries(new URLSearchParams(params));
};
