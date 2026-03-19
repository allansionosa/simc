'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { DataTable } from '@/components/ui/data-table/data-table';
import { useRouter } from 'next/navigation';
import { getColumns } from '@/components/ui/columns';
import { usePatientUser, usePatientUserActions } from '@/app/store';
import { toast } from 'sonner';
import HeadBar from '../../headbar';
import { Spinner } from '@/components/ui/spinner';
import React from 'react';

export type PatientExam = {
  id: number;
  examination: string;
  dateReleased: string;
  resultdate?: string;
  file: string;
  patientNumber: number;
  patientName: string;
};

type ChangePasswordFormData = {
  currentPass: string;
  newPass: string;
  confirmPassword: string;
};

export default function Patient() {
  const { setUser } = usePatientUserActions();
  const { email, patientno } = usePatientUser();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [filteredData, setFilteredData] = useState<PatientExam[]>([]);
  const [isChangePass, setIsChangePass] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const access_token = Cookies.get('simc_patient_access_token');

  const handleViewPDF = React.useCallback(
    async (_value: string) => {
      void _value;
      try {
        const newWindow = window.open('/TEST20001479.pdf', '_blank', 'noopener');
        if (!newWindow) return;
      } catch (error) {
        console.error('Error fetching the PDF:', error);
        toast('Error opening the PDF. Please try again later.');
      }
    },
    []
  );

  const getPatientResults = React.useCallback(async () => {
    // Dummy mode: render sample exam results.
    const pn = Number(patientno);
    const data: PatientExam[] = [
      {
        id: 1,
        examination: 'Complete Blood Count (CBC)',
        dateReleased: '2026-03-01',
        resultdate: '2026-03-01',
        file: 'dummy-cbc.pdf',
        patientNumber: pn,
        patientName: email,
      },
      {
        id: 2,
        examination: 'Urinalysis (UA)',
        dateReleased: '2026-03-05',
        resultdate: '2026-03-05',
        file: 'dummy-ua.pdf',
        patientNumber: pn,
        patientName: email,
      },
    ];

    setFilteredData(data);
    setIsDataLoading(false);
  }, [patientno, email]);

  useEffect(() => {
    if (!access_token) {
      setIsLoading(true);
      router.push('/portal/patient/login');
      return;
    }

    // Dummy mode: token refresh is disabled.
    setIsLoading(false);
  }, [access_token, router]);

  useEffect(() => {
    if (!isLoading) {
      getPatientResults();
    }
  }, [isLoading, getPatientResults]);

  const handleLogout = () => {
    Cookies.remove('simc_patient_access_token');
    setUser('', '', '');
    router.push('/portal/patient/login');
  };

  const handleOpenChangePass = () => {
    setIsChangePass(true);
  };

  const handleCancelChangePass = () => {
    setIsChangePass(false);
  };

  const handleChangePassword = async (_values: ChangePasswordFormData) => {
    void _values;
    setIsChangingPass(true);
    toast('Password updated successfully (dummy).');
    setIsChangePass(false);
    setIsChangingPass(false);
  };

  return (
    <section className="bg-milk h-screen">
      {!isLoading ? (
        <>
          <HeadBar
            user={email}
            onLogout={handleLogout}
            open={isChangePass}
            loading={isChangingPass}
            onClick={handleOpenChangePass}
            onCancel={handleCancelChangePass}
            onSubmit={handleChangePassword}
          />
          <div className="bg-white p-3 mt-10 rounded-md md:container mx-auto">
            <DataTable
              data={filteredData}
              columns={getColumns(handleViewPDF)}
              isLoading={isDataLoading}
            />
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </section>
  );
}
