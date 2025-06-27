'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, ChevronDown } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { name: 'Home', href: '/' },
  {
    name: 'About',
    href: '/about',
    dropdown: [
      { name: 'About Us', href: '/about/about-us' },
      { name: 'Company Profile', href: '/about/company-profile' },
      { name: 'HMO', href: '/about/hmo' },
    ],
  },
  { name: 'HMO Approval', href: '/hmo-approval' },
  { name: 'Services', href: '/services' },
  { name: 'Doctors', href: '/doctors' },
];

const afterDropdownLinks = [
  { name: 'News', href: '/news' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
];

const portalLinks = [
  { name: 'Patient Portal', href: '/portal/patient/login' },
  { name: 'Doctor Portal', href: '/portal/doctor/login' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const isAboutActive = pathname.startsWith('/about');

  return (
    <nav className="bg-primary px-4 py-2">
      <div className="container mx-auto flex items-center justify-between">
        <div className="sm:hidden flex items-center gap-3">
          <Image
            src="/simc_blue_bg.png"
            alt="simc Logo"
            width={40}
            height={40}
          />
          <div>
            <p className="font-heading font-semibold text-white text-sm leading-tight">
              St. Irenaeus Medical Center Inc.
            </p>
            <p className="text-xs text-white/80 mt-0.5">
              Your Health is Our Priority
            </p>
          </div>
        </div>
        <div className="hidden md:flex flex-1 items-center justify-between">
          <div className="flex gap-4 items-center">
            {navLinks.map((link) =>
              link.dropdown ? (
                <DropdownMenu key={link.name}>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className={`font-sans text-sm flex items-center gap-1 px-2 py-1 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                        isAboutActive
                          ? 'text-accent font-bold'
                          : 'text-white hover:text-accent'
                      }`}
                    >
                      {link.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {link.dropdown.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link
                          href={item.href}
                          className={`${
                            pathname === item.href
                              ? 'text-accent font-bold'
                              : ''
                          }`}
                        >
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-sans text-sm ${
                    pathname === link.href
                      ? 'text-accent font-bold'
                      : 'text-white hover:text-accent transition-colors'
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={`font-sans text-sm flex items-center gap-1 px-2 py-1 rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    portalLinks.some((link) => pathname === link.href)
                      ? 'text-accent font-bold'
                      : 'text-white hover:text-accent'
                  }`}
                >
                  Online Results
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {portalLinks.map((link) => (
                  <DropdownMenuItem key={link.name} asChild>
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${
                        pathname === link.href ? 'text-accent font-bold' : ''
                      }`}
                    >
                      {link.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {afterDropdownLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-sans text-sm ${
                  pathname === link.href
                    ? 'text-accent font-bold'
                    : 'text-white hover:text-accent transition-colors'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <Link
            href="/appointment"
            className="bg-accent text-white font-semibold px-4 py-1 rounded hover:bg-accent/90 ml-4"
          >
            Appointment
          </Link>
        </div>
        {/* Mobile hamburger with Sheet */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-primary/80 focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Open menu"
              >
                <Menu className="w-7 h-7" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-64 bg-primary text-white p-0"
            >
              <SheetTitle asChild>
                <VisuallyHidden>Navigation Menu</VisuallyHidden>
              </SheetTitle>
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 px-4 py-6 mt-5">
                  <Image
                    src="/simc_blue_bg.png"
                    alt="simc Logo"
                    width={36}
                    height={36}
                  />
                  <div>
                    <p className="font-heading font-semibold text-white text-base leading-tight">
                      St. Irenaeus Medical Center Inc.
                    </p>
                    <p className="text-xs text-white/80 -mt-1">
                      Your Health is Our Priority
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 px-4 py-6 flex-1">
                  {navLinks.map((link) =>
                    link.dropdown ? (
                      <Collapsible
                        key={link.name}
                        open={isAboutOpen}
                        onOpenChange={setIsAboutOpen}
                        className="py-2 px-2"
                      >
                        <CollapsibleTrigger className="flex items-center justify-between w-full">
                          <p
                            className={`font-sans text-base ${
                              isAboutActive
                                ? 'text-accent font-bold'
                                : 'text-white/80'
                            }`}
                          >
                            {link.name}
                          </p>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              isAboutOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="flex flex-col gap-2 pl-4 mt-2">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className={`font-sans text-sm py-1 px-2 rounded ${
                                pathname === item.href
                                  ? 'text-accent font-bold'
                                  : 'text-white hover:text-accent transition-colors'
                              }`}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`font-sans text-base py-2 px-2 rounded ${
                          pathname === link.href
                            ? 'text-accent font-bold'
                            : 'text-white hover:text-accent transition-colors'
                        }`}
                      >
                        {link.name}
                      </Link>
                    )
                  )}
                  <Collapsible className="py-2 px-2">
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
                      <p className="font-sans text-base text-white/80">
                        Online Results
                      </p>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="flex flex-col gap-2 pl-4 mt-2">
                      {portalLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`font-sans text-sm py-1 px-2 rounded ${
                            pathname === link.href
                              ? 'text-accent font-bold'
                              : 'text-white hover:text-accent transition-colors'
                          }`}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                  {afterDropdownLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`font-sans text-base py-2 px-2 rounded ${
                        pathname === link.href
                          ? 'text-accent font-bold'
                          : 'text-white hover:text-accent transition-colors'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <div className="px-4 pb-6">
                  <Link
                    href="/appointment"
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-accent text-white font-semibold p-2 rounded hover:bg-accent/90"
                  >
                    Appointment
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
