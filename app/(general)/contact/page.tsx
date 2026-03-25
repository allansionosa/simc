import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ContactUsForm from '@/components/contact/contact-us-form';
import { getFaqs } from '@/components/hooks/useFaqs';

import Map from '@/components/home/map';
import { Headphones, Mail, MapPin } from 'lucide-react';
import { Metadata } from 'next';

export default async function ContactPage() {
  const faqs = await getFaqs();

  return (
    <main className="bg-surface min-h-screen">
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-sky-50 via-white to-sky-100/80">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          aria-hidden
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234b9cd3' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="container relative mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <div className="max-w-3xl text-center md:text-left">
            <p className="mb-2 text-base font-medium uppercase tracking-widest text-accent">
              Contact us
            </p>
            <h1 className="font-heading mb-4 text-3xl font-bold text-primary md:text-5xl md:leading-tight">
              Get in touch
            </h1>
            <p className="text-muted mx-auto mb-8 max-w-xl text-base leading-relaxed md:mx-0 md:text-lg">
              Have questions or need assistance? We&apos;re here to help. Reach
              out through the form, review quick answers in our FAQ, or visit us
              in person—see the map below.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/90 px-4 py-2 text-sm text-foreground shadow-sm">
                <Mail className="h-4 w-4 shrink-0 text-secondary" />
                Message us online
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/90 px-4 py-2 text-sm text-foreground shadow-sm">
                <Headphones className="h-4 w-4 shrink-0 text-secondary" />
                Support &amp; inquiries
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/90 px-4 py-2 text-sm text-foreground shadow-sm">
                <MapPin className="h-4 w-4 shrink-0 text-secondary" />
                Directions below
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-14">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
            <div className="min-w-0 flex-1">
              <h2 className="mb-2 text-base font-medium uppercase tracking-widest text-accent">
                Send a message
              </h2>
              <p className="mb-6 text-sm text-muted-foreground">
                Fill out the form and our team will get back to you as soon as
                possible.
              </p>
              <ContactUsForm />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="mb-2 text-base font-medium uppercase tracking-widest text-accent">
                FAQ
              </h2>
              <h3 className="font-heading mb-4 text-2xl text-primary md:text-3xl">
                Frequently asked questions
              </h3>
              <Accordion
                type="single"
                collapsible
                className="w-full rounded-lg border border-border/60 bg-white/70 shadow-sm"
              >
                {faqs.map((faq) => (
                  <AccordionItem value={`faq-${faq.id}`} key={faq.id}>
                    <AccordionTrigger className="px-5 text-left font-medium">
                      {faq.title}
                    </AccordionTrigger>
                    <AccordionContent className="px-5 text-sm text-muted-foreground">
                      <div
                        className="tiptap-content"
                        dangerouslySetInnerHTML={{ __html: faq.description }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-14">
        <p className="mb-2 text-center text-base font-medium uppercase tracking-widest text-accent">
          Find us
        </p>
        <h2 className="font-heading mb-6 text-center text-2xl text-primary md:text-3xl">
          Our location
        </h2>
        <div className="h-96 w-full overflow-hidden rounded-lg border border-border/60 shadow-lg">
          <Map />
        </div>
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Contact Us | St. Irenaeus Medical Center Inc.',
  description:
    'Contact St. Irenaeus Medical Center Inc. for inquiries, appointments, or support. We are here to help you with your healthcare needs.',
  keywords: [
    'contact',
    'St. Irenaeus Medical Center',
    'support',
    'inquiries',
    'appointments',
    'healthcare',
    'Philippines',
  ],
  openGraph: {
    title: 'Contact Us | St. Irenaeus Medical Center Inc.',
    description:
      'Contact St. Irenaeus Medical Center Inc. for inquiries, appointments, or support. We are here to help you with your healthcare needs.',
    url: 'https://your-domain.com/contact',
    siteName: 'St. Irenaeus Medical Center Inc.',
    images: [
      {
        url: 'https://your-domain.com/simc_blue.png',
        width: 800,
        height: 600,
        alt: 'Contact St. Irenaeus Medical Center',
      },
    ],
    locale: 'en_PH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | St. Irenaeus Medical Center Inc.',
    description:
      'Contact St. Irenaeus Medical Center Inc. for inquiries, appointments, or support. We are here to help you with your healthcare needs.',
    images: ['https://your-domain.com/simc_blue.png'],
  },
};
