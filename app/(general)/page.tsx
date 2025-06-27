import About from '@/components/home/about';
import ContactUs from '@/components/home/contact-us';
import Hero from '@/components/home/Hero';
import Map from '@/components/home/map';
import News from '@/components/home/news';
import Portals from '@/components/home/portals';

import Services from '@/components/home/services';

export default function Home() {
  return (
    <div>
      <Hero />
      <Portals />
      <About />
      <Services />
      <News />
      <ContactUs />
      <Map />
    </div>
  );
}
