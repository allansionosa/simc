import Image from 'next/image';
import Link from 'next/link';

// const newsData = [
//   {
//     image: '/news-image.jpg',
//     date: 'Friday 10, February 2023',
//     category: 'News',
//     title: "This Article's Title goes here, but not too long",
//     link: '#',
//   },
//   {
//     image: '/news-image.jpg',
//     date: 'Friday 10, February 2023',
//     category: 'News',
//     title: "This Article's Title goes here, but not too long",
//     link: '#',
//   },
//   {
//     image: '/news-image.jpg',
//     date: 'Friday 10, February 2023',
//     category: 'News',
//     title: "This Article's Title goes here, but not too long",
//     link: '#',
//   },
//   {
//     image: '/news-image.jpg',
//     date: 'Friday 10, February 2023',
//     category: 'News',
//     title: "This Article's Title goes here, but not too long",
//     link: '#',
//   },
// ];

const getNews = async (): Promise<News[]> => {
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

export default async function News() {
  const data = await getNews();

  return (
    <section className="container mx-auto px-2 sm:px-4 py-8">
      <h3 className="uppercase text-accent font-medium w-full text-base tracking-widest text-center">
        Better Information Better Health
      </h3>
      <h2 className="text-primary/80 tracking-wide text-2xl md:text-4xl font-heading py-3 text-center">
        News
      </h2>
      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {data.map((news, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden flex flex-col md:flex-row h-full"
          >
            <div className="relative w-full h-40 md:w-48 md:h-auto flex-shrink-0">
              <Image
                src={news.image}
                alt={news.title}
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, 200px"
                priority={idx === 0}
              />
            </div>
            <div className="p-4 flex flex-col flex-1 justify-center">
              <div className="text-xs text-accent mb-1">
                {news.addedDate} | {news.type}
              </div>
              <div className="font-semibold text-primary mb-2 leading-snug">
                {news.title}
              </div>
              <div>
                <Link
                  href={`news/${news.slug}`}
                  className="text-accent text-sm font-medium hover:underline"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
