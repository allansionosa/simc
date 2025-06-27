'use client';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { DoctorDataTable } from '@/components/ui/data-table/doctor-data-table';
import PatientDrawer from '@/components/ui/patient-drawer';
import { PatientExam } from '../patient/page';

export type DoctorPatient = {
  patientNumber: string;
  patientName: string;
  results: PatientExam[];
  onViewFiles?: (p: DoctorPatient) => void;
};

// Doctor's patient list (mock data)
const patients = [
  {
    patientNumber: 'SIMC250000250',
    patientName: 'BELALO, CRISSELDA HAZEL ARGUEL',
    results: [
      {
        id: 'SIMCXRA25000065',
        examination: 'Chest PA',
        dateReleased: '2025-04-08',
        file: 'TEST20001479.pdf',
        patientNumber: 'SIMC250000250',
        patientName: 'BELALO, CRISSELDA HAZEL ARGUEL',
      },
      // Add more results if needed
    ],
  },
  {
    patientNumber: 'SIMC250000251',
    patientName: 'SANTOS, JUAN DELA CRUZ',
    results: [
      {
        id: 'SIMCLAB25000099',
        examination: 'Blood Chemistry',
        dateReleased: '2025-05-10',
        file: 'TEST20001479.pdf',
        patientNumber: 'SIMC250000251',
        patientName: 'SANTOS, JUAN DELA CRUZ',
      },
      {
        id: 'SIMCURN25000100',
        examination: 'Urinalysis',
        dateReleased: '2025-05-12',
        file: 'TEST20001479.pdf',
        patientNumber: 'SIMC250000251',
        patientName: 'SANTOS, JUAN DELA CRUZ',
      },
    ],
  },
  // Add more patients if needed
];

// Columns for the doctor table
const doctorColumns = [
  {
    accessorKey: 'patientNumber',
    header: 'Patient Number',
    cell: ({ row }: { row: { getValue: (key: string) => string } }) => (
      <span className="font-mono">{row.getValue('patientNumber')}</span>
    ),
  },
  {
    accessorKey: 'patientName',
    header: 'PATIENT NAME',
    cell: ({ row }: { row: { getValue: (key: string) => string } }) => (
      <span>{row.getValue('patientName')}</span>
    ),
  },
  {
    id: 'viewFiles',
    header: 'VIEW FILE',
    cell: ({ row }: { row: { original: DoctorPatient } }) => (
      <button
        className="text-primary underline hover:text-secondary font-semibold"
        onClick={() => row.original.onViewFiles?.(row.original)}
      >
        VIEW FILES
      </button>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

export default function DoctorDashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<DoctorPatient | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Prepare data with onViewFiles handler
  const tableData = patients.map((patient) => ({
    ...patient,
    onViewFiles: (p: DoctorPatient) => {
      setSelectedPatient(p);
      setDrawerOpen(true);
    },
  }));

  const handleLogout = () => {
    // Optionally clear auth/session here
    window.location.href = '/portal/doctor/login';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header (same as patient page) */}
      <header className="w-full bg-white shadow-sm py-4 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14 md:w-16 md:h-16">
            <Image
              src="/simc_blue.png"
              alt="SIMC Logo"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <span className="text-2xl md:text-3xl font-bold text-primary leading-tight">
              St. Irenaeus
            </span>
            <div className="text-xs text-gray-600 -mt-1">
              Medical Center Inc.
            </div>
          </div>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-2 text-gray-700 font-medium text-xs md:text-base focus:outline-none"
            onClick={() => setDropdownOpen((open) => !open)}
          >
            doctor@example.com
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex justify-center items-start mt-8 md:mt-12 px-2 md:px-0">
        <div className="bg-white p-3 mt-10 mx-2 rounded-md md:container ">
          <DoctorDataTable
            columns={doctorColumns}
            data={tableData as unknown as DoctorPatient[]}
            isLoading={false}
          />
        </div>
        {/* Patient Drawer for viewing results */}
        <PatientDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          record={selectedPatient as DoctorPatient}
          patientData={selectedPatient?.results || []}
          isLoading={false}
        />
      </main>
    </div>
  );
}
