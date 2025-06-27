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
    question: 'What are your operating hours?',
    answer:
      'Our hospital is open 24/7 for emergency services. Regular outpatient services are available Monday to Friday, 8:00 AM to 5:00 PM.',
  },
  {
    question: 'How can I schedule an appointment?',
    answer:
      'You can schedule an appointment by calling our main line, using our online booking system, or visiting our reception desk.',
  },
  {
    question: 'Do you accept insurance?',
    answer:
      'Yes, we accept most major insurance providers. Please contact our billing department for specific details.',
  },
  {
    question: 'What should I bring for my first visit?',
    answer:
      'Please bring your ID, insurance card, medical history, and any relevant medical records or prescriptions.',
  },
  {
    question: 'Is parking available?',
    answer:
      'Yes, we have a dedicated parking area for patients and visitors. Valet parking is also available.',
  },
];

export default function ContactPage() {
  return (
    <main className="bg-surface min-h-screen">
      {/* Hero/Intro */}
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

      {/* Contact Form & FAQ */}
      <section className="container mx-auto py-12 px-4">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <h3 className="text-accent uppercase font-medium tracking-widest text-base mb-2">
              Send Us a Message
            </h3>
            <form className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Input placeholder="First Name" className="flex-1" />
                <Input placeholder="Last Name" className="flex-1" />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <Input placeholder="Email" className="flex-1" />
                <Input placeholder="Phone Number" className="flex-1" />
              </div>
              <Input placeholder="Subject" />
              <Textarea placeholder="Your Message" rows={4} />
              <Button
                type="submit"
                className="bg-accent text-white font-medium w-fit"
              >
                Send Message
              </Button>
            </form>
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

      {/* Google Map Embed */}
      <section className="container mx-auto py-12 px-4">
        <h3 className="text-accent uppercase font-medium tracking-widest text-base mb-2 text-center">
          Find Us
        </h3>
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3857.1915983107506!2d120.94816997511037!3d14.814501085697625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397adcfd6eb3e07%3A0xa48dac26e446b588!2sGonzales%20street!5e0!3m2!1sen!2sph!4v1747885723875!5m2!1sen!2sph"
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
