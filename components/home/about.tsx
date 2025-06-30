import Image from 'next/image';

const getAbout = async (): Promise<About> => {
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

export default async function About() {
  const data = await getAbout();

  return (
    <section className="relative -z-10 mt-0 lg:mt-20">
      <div className="container mx-auto sm:px-0 px-4 py-10 text-center">
        <h1 className="uppercase text-accent font-medium w-full text-base tracking-widest">
          {data.title}
        </h1>
        <h2 className="text-primary/80 tracking-wide text-2xl md:text-4xl font-heading py-3">
          {data.subTitle}
        </h2>
        <p className="text-sm text-slate-500">{data.description}</p>
      </div>
      <div className="relative h-[200px] md:h-[400px] w-full overflow-hidden">
        <Image
          src={data.image}
          alt={data.title}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
    </section>
  );
}
