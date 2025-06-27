import Image from 'next/image';
import { Send } from 'lucide-react';

const Footer = () => (
  <footer className="bg-primary text-white py-8 px-4">
    <div className="container mx-auto flex flex-col lg:flex-row gap-8 lg:gap-0">
      {/* Logo & tagline */}
      <div className="flex-1 flex flex-col  lg:items-start mb-6 lg:mb-0">
        <div className="flex  gap-2 mb-2">
          <Image
            src="/simc_blue_bg.png"
            alt="St. Irenaeus Medical Center Inc. Logo"
            width={48}
            height={48}
          />
          <div>
            <span className="font-heading font-bold text-lg block">
              St. Irenaeus Medical Center Inc.
            </span>
            <span className="text-accent text-xs block">
              Your Health is our Priority
            </span>
          </div>
        </div>
        <p className="text-sm text-white/90 lg:text-left">
          Leading the Way in Medical Excellence, Trusted Care.
        </p>
      </div>
      {/* Important Links */}
      <div className="flex-1 flex flex-col  lg:items-start mb-6 lg:mb-0">
        <span className="font-semibold mb-2">Important Links</span>
        <ul className="space-y-1 text-sm">
          <li>
            <a href="#" className="hover:underline">
              Appointment
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Doctors
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              About Us
            </a>
          </li>
        </ul>
      </div>
      {/* Contact Us */}
      <div className="flex-1 flex flex-col  lg:items-start mb-6 lg:mb-0">
        <span className="font-semibold mb-2">Contact Us</span>
        <ul className="space-y-1 text-sm">
          <li>Call : 123456789</li>
          <li>Email : qwe@gmail.com</li>
          <li>Address : 123 Some unknown place</li>
          <li>Country</li>
        </ul>
      </div>
      {/* Newsletter */}
      <div className="flex-1 flex flex-col items-center lg:items-start">
        <span className="font-semibold mb-2">Newsletter</span>
        <form className="w-full flex items-center bg-white rounded-md overflow-hidden">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-3 py-2 text-primary text-sm outline-none bg-transparent"
          />
          <button
            type="submit"
            className="p-2 text-primary hover:text-accent transition-colors"
            aria-label="Subscribe"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  </footer>
);

export default Footer;
