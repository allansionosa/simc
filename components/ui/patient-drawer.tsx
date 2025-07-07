import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '../ui/drawer';
import { DataTable } from '../ui/data-table/data-table';
import { getColumns } from './columns';
import { PatientExam } from '@/app/(portal)/portal/patient/page';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { viewProtectedPdf } from '@/app/api';
import { toast } from 'sonner';

// Define the DoctorPatient type to match what's used in the doctor dashboard
type DoctorPatient = {
  id: number;
  patientno: string;
  patientname: string;
  key?: string;
};

interface PatientDrawerProps {
  open: boolean;
  onClose: () => void;
  record: DoctorPatient | undefined;
  patientData: PatientExam[];
  isLoading: boolean;
  token: string;
}

const PatientDrawer: React.FC<PatientDrawerProps> = ({
  open,
  onClose,
  record,
  patientData,
  token,
  isLoading,
}) => {
  const handleViewPDF = async (value: string) => {
    try {
      await viewProtectedPdf(value, token);
    } catch (error) {
      console.error('Error fetching the PDF:', error);
      if (error instanceof Error && error.message === 'PDF_NOT_FOUND') {
        toast(
          'PDF file is not available in the database yet. Please contact the hospital for more information.'
        );
      } else {
        toast(
          'Error fetching the PDF. Sorry for the inconvenience, please try again later.'
        );
      }
    }
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent className=" min-h-[80%]" onInteractOutside={onClose}>
        <VisuallyHidden>
          <DrawerTitle>Patient Results</DrawerTitle>
        </VisuallyHidden>
        <div className="md:container w-full mx-auto">
          <DrawerHeader className="!px-0">{record?.patientname}</DrawerHeader>
          <DataTable
            columns={getColumns(handleViewPDF)}
            data={patientData}
            isLoading={isLoading}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PatientDrawer;
