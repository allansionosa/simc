import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '../ui/drawer';
import { DataTable } from '../ui/data-table/data-table';
import { getColumns } from './columns';
import { PatientExam } from '@/app/(portal)/portal/patient/page';
import { DoctorPatient } from '@/app/(portal)/portal/doctor/page';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface PatientDrawerProps {
  open: boolean;
  onClose: () => void;
  record: DoctorPatient;
  patientData: PatientExam[];
  isLoading: boolean;
}

const PatientDrawer: React.FC<PatientDrawerProps> = ({
  open,
  onClose,
  record,
  patientData,
  isLoading,
}) => {
  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent className=" min-h-[80%]" onInteractOutside={onClose}>
        <VisuallyHidden>
          <DrawerTitle>Patient Results</DrawerTitle>
        </VisuallyHidden>
        <div className="md:container w-full mx-auto">
          <DrawerHeader className="!px-0">{record?.patientName}</DrawerHeader>
          <DataTable
            columns={getColumns()}
            data={patientData}
            isLoading={isLoading}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PatientDrawer;
