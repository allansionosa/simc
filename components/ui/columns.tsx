'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table/data-table-column-header';
import dayjs from 'dayjs';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '../ui/tooltip'; // Adjust the import path as necessary
import { PatientExam } from '@/app/(portal)/portal/patient/page';
import { FolderSearch } from 'lucide-react';

export const getColumns = (): // handleViewPDF: (value: string) => void
ColumnDef<PatientExam>[] => [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'examination',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Examination" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('examination')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'resultdate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Released" />
    ),
    cell: ({ row }) => {
      const dateValue = row.getValue('resultdate') as string;
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {dayjs(dateValue).format('MMMM DD, YYYY')}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'file',
    header: 'File',
    cell: ({ row }) => {
      const file = row.getValue('file') as string;
      return (
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={`/${file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl cursor-pointer grid text-primary hover:text-secondary"
                >
                  <FolderSearch />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-white">PDF file</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];
