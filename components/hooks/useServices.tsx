export const getServices = async (): Promise<Services[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
};
