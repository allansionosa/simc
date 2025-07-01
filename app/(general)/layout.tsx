import Footer from '@/components/home/footer';
import Header from '@/components/home/header';
import Navbar from '@/components/home/navbar';
import { Institution } from '@/components/hooks/useInstitution';

export default async function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const institution = await Institution();
  return (
    <div>
      <Header />
      <Navbar />
      <section>{children}</section>
      <Footer data={institution} />
    </div>
  );
}
