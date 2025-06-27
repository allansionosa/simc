'use client';
import Image from 'next/image';
import { useState, useRef } from 'react';

import { DataTable } from '@/components/ui/data-table/data-table';
import { useRouter } from 'next/navigation';
import { getColumns } from '@/components/ui/columns';

export type PatientExam = {
  id: number;
  examination: string;
  dateReleased: string;
  file: string;
  patientNumber: number;
  patientName: string;
};

const sampleData: PatientExam[] = [
  {
    id: 1,
    examination: 'CBC (Complete Blood Count)',
    dateReleased: '2024-06-01',
    file: 'TEST20001479.pdf',
    patientNumber: 1234567890,
    patientName: 'John Doe',
  },
  {
    id: 2,
    examination: 'Chest X-Ray',
    dateReleased: '2024-05-28',
    file: 'TEST20001479.pdf',
    patientNumber: 1234567890,
    patientName: 'John Doe',
  },
  {
    id: 3,
    examination: 'Urinalysis',
    dateReleased: '2024-05-20',
    file: 'TEST20001479.pdf',
    patientNumber: 1234567890,
    patientName: 'John Doe',
  },
];

const PatientDashboard = () => {
  // Dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  // (Optional: can be removed if you use a UI lib for dropdown)
  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent) {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
  //       setDropdownOpen(false);
  //     }
  //   }
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, []);

  const router = useRouter();

  const handleLogout = () => {
    // Optionally clear auth/session here
    router.push('/portal/patient/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
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
            patient@example.com
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
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 w-full max-w-4xl">
          {/* Table Area */}
          <DataTable
            columns={getColumns()}
            data={sampleData}
            isLoading={false}
          />
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
