export const createQueryString = (
  searchParams,
  query: { [key: string]: string | number | Date },
) => {
  return createQueryStringBulk(searchParams, query);
};

export const createQueryStringBulk = (
  searchParams,
  query: { [key: string]: string | number | Date },
) => {
  const params = new URLSearchParams(searchParams);

  for (const key in query) {
    if (Object.prototype.hasOwnProperty.call(query, key)) {
      const value = query[key];
      params.set(key, String(value));
    }
  }
  return params.toString();
};

export const removeQueryStringParam = (searchParams, name: string) => {
  const params = new URLSearchParams(searchParams);
  params.delete(name);

  return params.toString();
};
