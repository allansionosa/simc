'use client';
import { useEffect, useState } from 'react';
import { DoctorDataTable } from '@/components/ui/data-table/doctor-data-table';
import PatientDrawer from '@/components/ui/patient-drawer';
import { useDoctor, useDoctorActions } from '@/app/store';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import React from 'react';
import { getDoctorColumns } from '@/components/ui/data-table/doctor-columns';
import { Spinner } from '@/components/ui/spinner';
import HeadBar from '../../headbar';

type DoctorPatient = {
  id: number;
  patientno: string;
  patientname: string;
  key?: string;
};

type PatientExam = {
  id: number;
  examination: string;
  dateReleased: string;
  resultdate?: string;
  file: string;
  patientNumber: number;
  patientName: string;
  key?: string;
};

type ChangePasswordFormData = {
  currentPass: string;
  newPass: string;
  confirmPassword: string;
};

export default function DoctorDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const { email, doctorcode } = useDoctor();
  const [isChangePass, setIsChangePass] = useState(false);
  const [isChangeingPass, setIsChangeingPass] = useState(false);
  const { setDoctor } = useDoctorActions();
  const router = useRouter();
  const [filteredDoctorPatient, setFilteredDoctorPatient] = useState<
    DoctorPatient[]
  >([]);
  const [patientData, setPatientData] = useState<PatientExam[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isPatientDataLoading, setIsPatientDataLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [doctorRecord, setDataRecord] = useState<DoctorPatient>();
  const access_token = Cookies.get('simc_doctor_access_token');

  useEffect(() => {
    if (!access_token) {
      setIsLoading(true);
      router.push('/portal/doctor/login');
      return;
    }

    // Dummy mode: token refresh is disabled.
    setIsLoading(false);
  }, [access_token, router]);

  const handleLogout = async () => {
    // Dummy mode: clear session cookie only.
    Cookies.remove('simc_doctor_access_token');
    setDoctor('', '', '');
    router.push('/portal/doctor/login');
  };

  const handleOpenChangePass = () => {
    setIsChangePass(true);
  };

  const hanleCancelChangePass = () => {
    setIsChangePass(false);
  };

  const handleChangePassword = async (_values: ChangePasswordFormData) => {
    void _values;
    // Dummy mode: no backend call.
    setIsChangeingPass(true);
    toast('Password updated successfully (dummy).');
    setIsChangePass(false);
    setIsChangeingPass(false);
  };

  useEffect(() => {
    if (isLoading) return;

    // Dummy patients list.
    const data: DoctorPatient[] = [
      { id: 1, patientno: '1001', patientname: 'John Patient', key: '1' },
      { id: 2, patientno: '1002', patientname: 'Mary Patient', key: '2' },
      { id: 3, patientno: '1003', patientname: 'Alex Patient', key: '3' },
    ];

    setFilteredDoctorPatient(data);
    setIsDataLoading(false);
  }, [isLoading]);

  const getPatientResults = async (
    _doctorcode: string,
    patientNo: string,
    patientName: string
  ) => {
    // Dummy mode: generate sample results for the selected patient.
    setIsPatientDataLoading(true);
    const pn = Number(patientNo);

    const data: PatientExam[] = [
      {
        id: 1,
        examination: 'Complete Blood Count (CBC)',
        dateReleased: '2026-03-01',
        // `columns.tsx` looks for `resultdate`, so include it for display.
        resultdate: '2026-03-01',
        file: 'dummy-cbc.pdf',
        patientNumber: pn,
        patientName,
        key: '1',
      },
      {
        id: 2,
        examination: 'Urinalysis (UA)',
        dateReleased: '2026-03-05',
        resultdate: '2026-03-05',
        file: 'dummy-ua.pdf',
        patientNumber: pn,
        patientName,
        key: '2',
      },
    ];

    setPatientData(data);
    setIsPatientDataLoading(false);
  };

  const handleOpenDrawer = (record: DoctorPatient) => {
    getPatientResults(doctorcode, record.patientno, record.patientname);
    setIsDrawerOpen(true);
    setDataRecord(record);
  };

  const handleCloseDrawer = () => setIsDrawerOpen(false);

  const columns = getDoctorColumns({ handleOpenDrawer });

  return (
    <section className="bg-milk h-screen">
      {!isLoading ? (
        <>
          <HeadBar
            user={email}
            onLogout={handleLogout}
            open={isChangePass}
            loading={isChangeingPass}
            onClick={handleOpenChangePass}
            onCancel={hanleCancelChangePass}
            onSubmit={handleChangePassword}
          />
          <div className="bg-white p-3 mt-10 mx-auto rounded-md md:container">
            <DoctorDataTable
              columns={columns}
              data={filteredDoctorPatient}
              isLoading={isDataLoading}
            />
          </div>
          <PatientDrawer
            open={isDrawerOpen}
            onClose={handleCloseDrawer}
            record={doctorRecord}
            patientData={patientData}
            isLoading={isPatientDataLoading}
            token="dummy-token"
          />
        </>
      ) : (
        <Spinner />
      )}
    </section>
  );
}
