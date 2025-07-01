import Image from 'next/image';
import { getAbout } from '../hooks/useAbout';

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
