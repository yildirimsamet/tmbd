export const addApiKey = (url) => {
  const newUrl = new URL(url);

  newUrl.searchParams.set("api_key", process.env.NEXT_PUBLIC_API_KEY);

  return newUrl.href;
};
