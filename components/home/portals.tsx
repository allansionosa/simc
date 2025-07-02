import { Users, User, UserCircle } from 'lucide-react';

const portals = [
  {
    label: 'Find a Doctor',
    icon: <Users className="w-7 h-7" />,
    href: '/doctors',
    bg: 'bg-sky-500',
    text: 'text-white',
    rounded: 'rounded-lg',
  },
  {
    label: 'Doctor Portal',
    icon: <User className="w-7 h-7" />,
    href: '/portal/doctor/login',
    bg: 'bg-primary',
    text: 'text-white',
    rounded: 'rounded-lg',
  },
  {
    label: 'Patient Portal',
    icon: <UserCircle className="w-7 h-7" />,
    href: '/portal/patient/login',
    bg: 'bg-accent',
    text: 'text-white',
    rounded: 'rounded-lg',
  },
];

const Portals = () => (
  <div className="hidden lg:flex w-full justify-center items-stretch -translate-y-2/4 z-50">
    <div className="flex w-full max-w-6xl mx-auto gap-0">
      {portals.map((portal) => (
        <a
          key={portal.label}
          href={portal.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            flex-1 flex flex-col items-center justify-center h-20
            mx-4
            ${portal.bg} ${portal.text} ${portal.rounded}
            transition-transform hover:scale-[1.03]
          `}
        >
          <div>{portal.icon}</div>
          <span className="mt-1 font-medium">{portal.label}</span>
        </a>
      ))}
    </div>
  </div>
);

export default Portals;
