import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';

import { FolderSearch } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../tooltip';

interface DoctorTableProps {
  handleOpenDrawer: (record: DoctorPatient) => void;
}

export const getDoctorColumns = ({
  handleOpenDrawer,
}: DoctorTableProps): ColumnDef<DoctorPatient>[] => [
  {
    accessorKey: 'patientno',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Patient Number" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue('patientno')}</div>
    ),
  },
  {
    accessorKey: 'patientname',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Patient Name" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue('patientname')}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'action',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <a
                onClick={() => handleOpenDrawer(row.original)}
                className="text-2xl cursor-pointer grid text-primary hover:text-secondary"
              >
                <FolderSearch />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-white">View Patient Results</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
  },
];
