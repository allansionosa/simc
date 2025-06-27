import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'This is panel header 1',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est laborum suscipit expedita, fugiat ullam voluptatum, odio iusto vel nostrum minima ipsum laudantium dolore alias adipisci quo cupiditate possimus quis. Officia.',
  },
  {
    question: 'This is panel header 2',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est laborum suscipit expedita, fugiat ullam voluptatum, odio iusto vel nostrum minima ipsum laudantium dolore alias adipisci quo cupiditate possimus quis. Officia.',
  },
  {
    question: 'This is panel header 3',
    answer: '',
  },
  {
    question: 'This is panel header 4',
    answer: '',
  },
  {
    question: 'This is panel header 5',
    answer: '',
  },
];

const ContactUs = () => {
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
          <form className="space-y-3">
            <div className="flex flex-col md:flex-row gap-3">
              <Input placeholder="First Name" className="flex-1" />
              <Input placeholder="Last Name" className="flex-1" />
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <Input placeholder="Email" className="flex-1" />
              <Input placeholder="Contact Number" className="flex-1" />
            </div>
            <Input placeholder="Subject" />
            <Textarea placeholder="Message" rows={4} />
            <Button
              type="submit"
              className="bg-accent text-white font-medium w-fit"
            >
              Send Message
            </Button>
          </form>
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
            {faqs.map((faq, idx) => (
              <AccordionItem value={`item-${idx}`} key={idx}>
                <AccordionTrigger className="font-medium px-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted px-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
