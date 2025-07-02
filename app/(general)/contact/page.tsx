import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ContactUsForm from '@/components/contact/contact-us-form';
import { getFaqs } from '@/components/hooks/useFaqs';
import { Institution } from '@/components/hooks/useInstitution';

export default async function ContactPage() {
  const faqs = await getFaqs();
  const institution = await Institution();

  return (
    <main className="bg-surface min-h-screen">
      <section className="relative w-full bg-gradient-to-r from-sky-100 via-sky-200 to-white py-12 md:py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-accent uppercase font-medium tracking-widest text-base mb-2">
              Contact Us
            </h1>
            <h2 className="font-heading text-3xl md:text-5xl text-primary font-bold mb-4">
              Get in Touch
            </h2>
            <p className="text-muted text-base md:text-lg mb-6 max-w-xl">
              Have questions or need assistance? We&apos;re here to help. Reach
              out to us through the form below or visit our FAQ section for
              quick answers.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-12 px-4">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <h3 className="text-accent uppercase font-medium tracking-widest text-base mb-2">
              Send Us a Message
            </h3>
            <ContactUsForm />
          </div>
          <div className="flex-1">
            <h3 className="text-accent uppercase font-medium tracking-widest text-base mb-2">
              Frequently Asked Questions
            </h3>
            <Accordion
              type="single"
              collapsible
              className="w-full rounded-lg bg-white/60"
            >
              {faqs.map((faq, idx) => (
                <AccordionItem value={`item-${idx}`} key={idx}>
                  <AccordionTrigger className="font-medium px-5">
                    {faq.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted px-5">
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
      </section>
      <section className="container mx-auto py-12 px-4">
        <h3 className="text-accent uppercase font-medium tracking-widest text-base mb-2 text-center">
          Find Us
        </h3>
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={institution.addressLink}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </main>
  );
}
