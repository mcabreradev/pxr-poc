export const createQueryString = (
  searchParams,
  name: string,
  value: string,
) => {
  const params = new URLSearchParams(searchParams);
  params.set(name, value);

  return params.toString();
};

export const removeQueryStringParam = (searchParams, name: string) => {
  const params = new URLSearchParams(searchParams);
  params.delete(name);

  return params.toString();
};
