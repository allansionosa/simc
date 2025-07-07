'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { DataTable } from '@/components/ui/data-table/data-table';
import { useRouter } from 'next/navigation';
import { getColumns } from '@/components/ui/columns';
import { usePatientUser, usePatientUserActions } from '@/app/store';
import { changePassword, getPatientExam, viewProtectedPdf } from '@/app/api';
import { logout, refreshToken } from '@/app/api/auth';
import { toast } from 'sonner';
import HeadBar from '../../headbar';
import { Spinner } from '@/components/ui/spinner';
import React from 'react';

export type PatientExam = {
  id: number;
  examination: string;
  dateReleased: string;
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
  const { email, patientno, token } = usePatientUser();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [filteredData, setFilteredData] = useState<PatientExam[]>([]);
  const [isChangePass, setIsChangePass] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const access_token = Cookies.get('simc_patient_access_token');

  const handleViewPDF = React.useCallback(
    async (value: string) => {
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
    },
    [token]
  );

  const refresh = React.useCallback(async () => {
    try {
      if (access_token) {
        setIsLoading(true);
        const response = await refreshToken('patient', access_token);
        const { email, patientno, token } = response;
        setUser(email, patientno, token);
        setIsLoading(false);
      } else {
        router.push('/portal/patient/login');
      }
    } catch (err: unknown) {
      const errorMsg =
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response &&
        err.response.data &&
        typeof err.response.data === 'object' &&
        'message' in err.response.data
          ? (err.response.data.message as string)
          : 'Something went wrong, please try again later';
      toast(errorMsg);
      Cookies.remove('simc_patient_access_token');
      router.push('/portal/patient/login');
      console.log(err);
    }
  }, [access_token, router, setUser]);

  const getPatientResults = React.useCallback(async () => {
    try {
      const res = await getPatientExam(patientno, token);
      // Map API response to PatientExam type
      const data: PatientExam[] = (Array.isArray(res) ? res : []).map(
        (item: unknown) => {
          if (item && typeof item === 'object') {
            const obj = item as Record<string, unknown>;
            return {
              id: Number(obj.id),
              examination: String(obj.examination),
              dateReleased: String(obj.dateReleased || obj.resultdate || ''),
              file: String(obj.file || obj.filename || ''),
              patientNumber: Number(obj.patientNumber || patientno),
              patientName: String(obj.patientName || email),
            };
          }
          // fallback for unexpected item
          return {
            id: 0,
            examination: '',
            dateReleased: '',
            file: '',
            patientNumber: 0,
            patientName: '',
          };
        }
      );
      setFilteredData(data);
    } catch (err: unknown) {
      const errorMsg =
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response &&
        err.response.data &&
        typeof err.response.data === 'object' &&
        'message' in err.response.data
          ? (err.response.data.message as string)
          : 'Something went wrong, please try again later';
      toast(errorMsg);
      console.log(err);
    } finally {
      setIsDataLoading(false);
    }
  }, [patientno, token, email]);

  useEffect(() => {
    if (access_token) {
      refresh();
    } else {
      setIsLoading(true);
      router.push('/portal/patient/login');
    }
  }, [access_token, router]);

  useEffect(() => {
    if (!isLoading) {
      getPatientResults();
    }
  }, [isLoading, patientno, token]);

  const handleLogout = async () => {
    try {
      await logout('patient');
      Cookies.remove('simc_patient_access_token');
      router.push('/portal/patient/login');
    } catch (err: unknown) {
      const errorMsg =
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response &&
        err.response.data &&
        typeof err.response.data === 'object' &&
        'message' in err.response.data
          ? (err.response.data.message as string)
          : 'Something went wrong, please try again later';
      toast(errorMsg);
      console.log(err);
    }
  };

  const handleOpenChangePass = () => {
    setIsChangePass(true);
  };

  const handleCancelChangePass = () => {
    setIsChangePass(false);
  };

  const handleChangePassword = async (values: ChangePasswordFormData) => {
    try {
      setIsChangingPass(true);
      const payload = {
        currentPass: values.currentPass,
        newPass: values.newPass,
        email: email,
      };
      const response = await changePassword(payload, 'patient', token);
      toast('Password Updated! ' + response);
      setIsChangePass(false);
    } catch (err: unknown) {
      const errorMsg =
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response &&
        err.response.data
          ? (err.response.data as string)
          : 'Sorry for the inconvenience, please try again later.';
      toast(errorMsg);
      console.log(err);
    } finally {
      setIsChangingPass(false);
    }
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
