import Image from 'next/image';

const newsData = [
  {
    image: '/news1.jpg',
    date: 'Friday 10, February 2023',
    category: 'News',
    title: 'Hospital Achieves Top Accreditation',
    description:
      'Our hospital has been awarded the highest accreditation for patient safety and quality care.',
    link: '#',
  },
  {
    image: '/news-image.jpg',
    date: 'Monday 20, March 2023',
    category: 'Event',
    title: 'Free Health Checkup Camp Announced',
    description:
      'Join us for a free health checkup camp this weekend. Open to all community members.',
    link: '#',
  },
  {
    image: '/news-image.jpg',
    date: 'Wednesday 5, April 2023',
    category: 'Update',
    title: 'New Pediatric Wing Opens',
    description:
      "We are excited to announce the opening of our new pediatric wing, dedicated to children's health.",
    link: '#',
  },
  {
    image: '/news-image.jpg',
    date: 'Friday 21, April 2023',
    category: 'News',
    title: 'COVID-19 Vaccination Drive Success',
    description:
      'Our recent vaccination drive helped protect over 5,000 community members.',
    link: '#',
  },
];

export default function NewsPage() {
  return (
    <main className="bg-surface min-h-screen">
      {/* Hero/Intro */}
      <section className="relative w-full bg-gradient-to-r from-sky-100 via-sky-200 to-white py-12 md:py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-accent uppercase font-medium tracking-widest text-base mb-2">
              News & Updates
            </h1>
            <h2 className="font-heading text-3xl md:text-5xl text-primary font-bold mb-4">
              Better Information, Better Health
            </h2>
            <p className="text-muted text-base md:text-lg mb-6 max-w-xl">
              Stay up to date with the latest news, events, and updates from St.
              Irenaeus Medical Center Inc. We are committed to keeping our
              community informed and healthy.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src="/news1.jpg"
              alt="News Hero"
              width={400}
              height={300}
              className="rounded-xl shadow-lg object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {newsData.map((news, idx) => (
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
                  {news.date} | {news.category}
                </div>
                <div className="font-semibold text-primary mb-2 leading-snug">
                  {news.title}
                </div>
                <div className="text-muted text-sm mb-2">
                  {news.description}
                </div>
                <div>
                  <a
                    href={news.link}
                    className="text-accent text-sm font-medium hover:underline"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-accent py-10">
        <div className="container mx-auto text-center">
          <h4 className="font-heading text-2xl text-white mb-2">
            Want to stay updated with our latest news?
          </h4>
          <p className="text-white/90 mb-4">
            Subscribe to our newsletter or follow us on social media for more
            updates.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-accent font-semibold px-6 py-2 rounded shadow hover:bg-slate-100 transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}
