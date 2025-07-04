import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { BiChevronDown } from 'react-icons/bi';
import ChangePasswordForm from './changePasswordForm';

type ChangePasswordFormData = {
  currentPass: string;
  newPass: string;
  confirmPassword: string;
};

type HeadBarProps = {
  user?: string;
  onLogout?: () => void;
  open: boolean;
  loading: boolean;
  onCancel: () => void;
  onClick: () => void;
  onSubmit: (values: ChangePasswordFormData) => void;
};
export default function HeadBar({
  user,
  onLogout,
  open,
  loading,
  onSubmit,
  onClick,
  onCancel,
}: HeadBarProps) {
  const items = [
    {
      label: <p>{user}</p>,
      id: 1,
    },
    {
      label: (
        <p className="w-full" onClick={onClick}>
          Change password
        </p>
      ),
      id: 2,
    },
    {
      label: (
        <p className="w-full" onClick={onLogout}>
          Logout
        </p>
      ),
      id: 3,
    },
  ];
  return (
    <div className="bg-white">
      <div className="container py-3 flex justify-between items-center">
        <div className="relative w-[300px] h-[80px]">
          <Image
            src="/simc_blue.png"
            alt="SIMC logo"
            fill
            className="object-contain"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex space-x-3 item-center">
            <p className="hidden md:block">{user}</p>
            <BiChevronDown className="text-2xl" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {items.map((item) => (
              <DropdownMenuItem key={item.id} disabled={item.id === 1}>
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ChangePasswordForm
        open={open}
        loading={loading}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </div>
  );
}
