export const getAbout = async (): Promise<About> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/home/about`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
};
