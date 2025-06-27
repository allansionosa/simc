import Image from 'next/image';

export default async function About() {
  return (
    <section className="relative -z-10 mt-0 lg:mt-20">
      <div className="container mx-auto sm:px-0 px-4 py-10 text-center">
        <h1 className="uppercase text-accent font-medium w-full text-base tracking-widest">
          Welcome to St. Irenaeus Medical Center Inc.
        </h1>
        <h2 className="text-primary/80 tracking-wide text-2xl md:text-4xl font-heading py-3">
          A Great Place to Receive Care
        </h2>
        <p className="text-sm text-slate-500">
          St. Irenaeus Medical Center Inc. is a leading provider of medical care
          in the Philippines. We are dedicated to providing the highest quality
          medical services to our patients.
        </p>
      </div>
      <div className="relative h-[200px] md:h-[400px] w-full overflow-hidden">
        <Image
          src="/room2.jpg"
          alt="About"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
    </section>
  );
}
