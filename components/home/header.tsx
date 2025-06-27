import { MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="container mx-auto py-4 px-4 sm:px-0 ">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-3">
          <Image
            src="/simc_blue.png"
            alt="simc Logo"
            width={100}
            height={100}
          />
          <div>
            <p className="font-heading font-bold text-primary text-lg leading-tight">
              St. Irenaeus Medical Center Inc.
            </p>
            <p className="text-sm text-accent -mt-1">
              Your Health is our Priority
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-2">
            <Phone className="w-6 h-6 text-primary" />
            <div className="ml-1">
              <p className="text-sm font-bold uppercase text-primary">
                Emergency
              </p>
              <p className="font-heading font-semibold text-accent">
                8952-2589
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary" />
            <div className="ml-1">
              <p className="text-sm font-bold uppercase text-primary">
                Location
              </p>
              <p className="font-heading font-semibold text-accent">
                Gonzales street, 239 Bundukan, Bocaue, Bulacan
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
