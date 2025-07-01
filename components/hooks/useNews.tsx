export const getNews = async (): Promise<News[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
};
