const filterParams = (searchParams) => {
  const filteredSearchParams: string[] = [];
  searchParams.forEach((value, key) => {
    if (key === 'email' || key === 'action') {
      return;
    } else {
      filteredSearchParams.push(`${key}=${value}`);
    }
  });
  return filteredSearchParams;
};

export default filterParams;
