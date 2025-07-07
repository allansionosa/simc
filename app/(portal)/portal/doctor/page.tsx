'use client';
import { useEffect, useState } from 'react';
import { DoctorDataTable } from '@/components/ui/data-table/doctor-data-table';
import PatientDrawer from '@/components/ui/patient-drawer';
import { useDoctor, useDoctorActions } from '@/app/store';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { doctorRefreshToken, logout } from '@/app/api/auth';
import { toast } from 'sonner';
import React from 'react';
import {
  changePassword,
  getDoctorPatientExam,
  getDoctorsPatient,
} from '@/app/api';
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

type ApiError = {
  response?: {
    data?: string;
    message?: string;
  };
  message?: string;
};

export default function DoctorDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const { email, doctorcode, token } = useDoctor();
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

  const refresh = React.useCallback(async () => {
    try {
      if (access_token) {
        setIsLoading(true);
        const response = await doctorRefreshToken(access_token);
        const { email, doctorcode, token } = response;
        setDoctor(email, doctorcode, token);
        setIsLoading(false);
      } else {
        router.push('/portal/doctor/login');
      }
    } catch (err: unknown) {
      handleApiError(err as ApiError);
    }
  }, [access_token, router, setDoctor]);

  const handleApiError = React.useCallback(
    (err: ApiError) => {
      const errorMessage =
        err.response?.data ||
        err.response?.message ||
        err.message ||
        'Something went wrong, please try again later';
      toast(errorMessage);
      Cookies.remove('simc_doctor_access_token');
      router.push('/portal/doctor/login');
      console.log(err);
    },
    [router]
  );

  useEffect(() => {
    if (access_token) {
      refresh();
    } else {
      setIsLoading(true);
      router.push('/portal/doctor/login');
    }
  }, [access_token, router]);

  const handleLogout = async () => {
    try {
      await logout('doctor');
      Cookies.remove('simc_doctor_access_token');
      router.push('/portal/doctor/login');
    } catch (err: unknown) {
      handleApiError(err as ApiError);
    }
  };

  const handleOpenChangePass = () => {
    setIsChangePass(true);
  };

  const hanleCancelChangePass = () => {
    setIsChangePass(false);
  };

  const handleChangePassword = async (values: ChangePasswordFormData) => {
    try {
      setIsChangeingPass(true);
      const payload = {
        currentPass: values.currentPass,
        newPass: values.newPass,
        email: email,
      };
      const response = await changePassword(payload, 'doctor', token);
      toast(response);
      setIsChangePass(false);
    } catch (err: unknown) {
      handleApiError(err as ApiError);
    } finally {
      setIsChangeingPass(false);
    }
  };

  const getPatients = async () => {
    try {
      const res = await getDoctorsPatient(doctorcode, token);
      const data = res.map((item) => ({
        key: String(item.id),
        ...item,
      }));
      setFilteredDoctorPatient(data);
    } catch (err: unknown) {
      handleApiError(err as ApiError);
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      getPatients();
    }
  }, [isLoading, doctorcode, token]);

  const getPatientResults = async (doctorcode: string, patientNo: string) => {
    try {
      const res = await getDoctorPatientExam(doctorcode, patientNo, token);
      // Map API response to PatientExam type to match the expected structure
      const data: PatientExam[] = (Array.isArray(res) ? res : []).map(
        (item: unknown) => {
          if (item && typeof item === 'object') {
            const obj = item as Record<string, unknown>;
            return {
              id: Number(obj.id),
              examination: String(obj.examination),
              dateReleased: String(obj.dateReleased || obj.resultdate || ''),
              file: String(obj.file || obj.filename || ''),
              patientNumber: Number(obj.patientNumber || patientNo),
              patientName: String(obj.patientName || ''),
              key: String(obj.id),
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
            key: '0',
          };
        }
      );
      setPatientData(data);
    } catch (err: unknown) {
      handleApiError(err as ApiError);
    } finally {
      setIsDataLoading(false);
      setIsPatientDataLoading(false);
    }
  };

  const handleOpenDrawer = (record: DoctorPatient) => {
    getPatientResults(doctorcode, record.patientno);
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
            token={token}
          />
        </>
      ) : (
        <Spinner />
      )}
    </section>
  );
}
