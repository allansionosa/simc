import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ContactUsForm from '../contact/contact-us-form';
import { getFaqs } from '../hooks/useFaqs';

export default async function ContactUs() {
  const data = await getFaqs();
  return (
    <section className="w-full bg-gradient-to-br from-sky-100 via-sky-200 to-primary py-10 px-2">
      <div className="container mx-auto flex flex-col lg:flex-row gap-10">
        <div className="flex-1  mx-auto ">
          <h3 className="uppercase text-accent font-medium text-sm tracking-widest mb-1">
            Get in touch with us
          </h3>
          <h2 className="font-heading text-2xl md:text-3xl text-primary mb-2">
            Contact
          </h2>
          <p className="text-muted mb-6 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Perferendis neque sapiente amet alias accusamus maiores voluptates
            beatae exercitationem maxime excepturi error, iusto enim unde
            distinctio vero atque quisquam voluptate eius!
          </p>
          <ContactUsForm />
        </div>
        <div className="flex-1 mx-auto w-full">
          <h3 className="uppercase text-accent font-medium text-sm tracking-widest mb-1 mt-10 lg:mt-0">
            FAQS
          </h3>
          <h2 className="font-heading text-2xl md:text-3xl text-primary mb-4">
            Frequently asked questions
          </h2>
          <Accordion
            type="single"
            collapsible
            className="w-full rounded-lg bg-white/60"
          >
            {data.map((faq, id) => (
              <AccordionItem value={`item-${id}`} key={id}>
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
  );
}
