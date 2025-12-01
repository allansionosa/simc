import Footer from '@/components/home/footer';
import Header from '@/components/home/header';
import Navbar from '@/components/home/navbar';
// NOTE:
// The dynamic institution data has been disabled for now to keep the app
// fully static for deployment to Vercel without an API.
// When you are ready to use the API again, re-enable the Institution import
// and the async layout logic.

const dummyInstitution: Institution = {
  id: 1,
  logo: '/simc_blue.png',
  logoWhite: '/simc_blue_bg.png',
  address: 'Your clinic address here',
  facebook: 'https://facebook.com/simc',
  emailGeneralInfo: 'info@simc.example',
  emailCareers: 'careers@simc.example',
  emailAppointment: 'appointments@simc.example',
  contactNo: '(000) 000-0000',
  addressLink: 'https://maps.google.com',
};

export default function GeneralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const institution = dummyInstitution;

  return (
    <div>
      <Header />
      <Navbar />
      <section>{children}</section>
      <Footer data={institution} />
    </div>
  );
}
