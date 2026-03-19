import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '../ui/drawer';
import { DataTable } from '../ui/data-table/data-table';
import { getColumns } from './columns';
import { PatientExam } from '@/app/(portal)/portal/patient/page';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
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
  isLoading,
}) => {
  const handleViewPDF = async () => {
    // Dummy mode: always open the same sample PDF.
    // Using a direct public URL avoids calling protected backend endpoints.
    try {
      const newWindow = window.open('/TEST20001479.pdf', '_blank', 'noopener');
      if (!newWindow) return;
    } catch {
      toast('Error opening the PDF. Please try again later.');
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
