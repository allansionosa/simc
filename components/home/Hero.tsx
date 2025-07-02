import Image from 'next/image';
import Link from 'next/link';

const getHomeAbout = async (): Promise<HomeBanner[]> => {
  const res = await fetch(
    `${[process.env.NEXT_PUBLIC_API_URL]}/api/home/banner`,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      cache: 'no-store',
    }
  );
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
};

export default async function HeroBanner() {
  const data = await getHomeAbout();

  return (
    <div>
      {data.map((item) => (
        <div
          className="relative h-[500px] w-full overflow-hidden"
          key={item.id}
        >
          <div className="absolute inset-0">
            <Image
              src={item.image}
              alt={item.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-900/30"></div>
          </div>

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
            <div className="max-w-3xl">
              <h3 className="mb-2 text-lg font-medium uppercase tracking-wider text-sky-400 font-heading">
                {item.title}
              </h3>
              <h2 className="mb-6 text-3xl font-bold font-heading leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                {item.subTitle}
              </h2>
              <Link
                href="/about/about-us"
                className="inline-flex items-center justify-center rounded-md bg-sky-500 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
