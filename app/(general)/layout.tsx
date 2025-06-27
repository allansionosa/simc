import Footer from '@/components/home/footer';
import Header from '@/components/home/header';
import Navbar from '@/components/home/navbar';

export default function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <Navbar />
      <section>{children}</section>
      <Footer />
    </div>
  );
}
