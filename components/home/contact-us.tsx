import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ContactUsForm from '@/components/contact/contact-us-form';
import { getFaqs } from '@/components/hooks/useFaqs';

export default async function ContactUs() {
  const data = await getFaqs();

  return (
    <section className="w-full bg-gradient-to-br from-sky-50 via-sky-100/90 to-white py-10 md:py-14">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <p className="mb-2 text-base font-medium uppercase tracking-widest text-accent">
            Get in touch
          </p>
          <h2 className="font-heading text-2xl text-primary/90 md:text-4xl">
            Contact us
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm  md:text-base">
            Have questions or need assistance? Send a message or browse common
            answers below—we&apos;re here to help.
          </p>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          <div className="min-w-0 flex-1">
            <h3 className="mb-2 text-base font-medium uppercase tracking-widest text-accent">
              Send a message
            </h3>
            <p className="mb-6 text-sm ">
              Fill out the form and our team will get back to you as soon as
              possible.
            </p>
            <ContactUsForm />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="mb-2 text-base font-medium uppercase tracking-widest text-accent">
              FAQ
            </h3>
            <h2 className="font-heading mb-4 text-2xl text-primary md:text-3xl">
              Frequently asked questions
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full rounded-lg border border-border/60 bg-white/70 shadow-sm"
            >
              {data.map((faq) => (
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
  );
}
