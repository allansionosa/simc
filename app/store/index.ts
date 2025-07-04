import { create } from 'zustand';

type PatientUserStoreProps = {
  isPatientLoggedIn: boolean;
  email: string;
  patientno: string;
  token: string;
  actions: {
    setUser: (email: string, patientno: string, token: string) => void;
    setPatientLoggedIn: (log: boolean) => void;
  };
};

const usePatientUserStore = create<PatientUserStoreProps>((set) => ({
  isPatientLoggedIn: false,
  email: '',
  patientno: '',
  token: '',
  actions: {
    setUser: (email, patientno, token) =>
      set(() => ({ email, patientno, token })),
    setPatientLoggedIn: (log) => set(() => ({ isPatientLoggedIn: log })),
  },
}));

export const usePatientUser = () => usePatientUserStore((state) => state);
export const usePatientUserActions = () =>
  usePatientUserStore((state) => state.actions);

type DoctorStoreProps = {
  email: string;
  doctorcode: string;
  token: string;
  actions: {
    setDoctor: (email: string, doctorcode: string, token: string) => void;
  };
};

const useDoctorStore = create<DoctorStoreProps>((set) => ({
  email: '',
  doctorcode: '',
  token: '',
  actions: {
    setDoctor: (email: string, doctorcode: string, token: string) =>
      set(() => ({ email, doctorcode, token })),
  },
}));

export const useDoctor = () => useDoctorStore((state) => state);
export const useDoctorActions = () => useDoctorStore((state) => state.actions);
