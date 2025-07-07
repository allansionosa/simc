import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
  },
});

const authorizedConfig = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const uploadImage = async (
  file: FormData,
  path: string
): Promise<string> => {
  return await api
    .post(`/api/${path}/upload`, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: '*/*',
      },
    })
    .then((res) => res.data);
};

export const viewProtectedPdf = async (
  url: string,
  token: string
): Promise<void> => {
  try {
    const response = await axios.get(url, {
      headers: {
        ...authorizedConfig(token).headers,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
      responseType: 'blob',
    });

    // Check for URL.createObjectURL support
    if (
      typeof window !== 'undefined' &&
      window.URL &&
      window.URL.createObjectURL
    ) {
      const bloblUrl = window.URL.createObjectURL(response.data);
      const newWindow = window.open(bloblUrl, '_tab');
      if (!newWindow) {
        const link = document.createElement('a');
        link.href = bloblUrl;
        link.download = 'protected.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      // Clean up the object URL to prevent memory leaks
      setTimeout(() => {
        if (window.URL && window.URL.revokeObjectURL) {
          window.URL.revokeObjectURL(bloblUrl);
        }
      }, 1000);
    } else {
      // Fallback for older browsers
      throw new Error(
        'PDF viewing is not supported in this browser. Please download the file manually.'
      );
    }
  } catch (error: unknown) {
    if (
      error &&
      typeof error === 'object' &&
      'response' in error &&
      error.response &&
      typeof error.response === 'object' &&
      'status' in error.response &&
      error.response.status === 404
    ) {
      throw new Error('PDF_NOT_FOUND');
    }
    throw error;
  }
};

export const sendContactMail = async (payload: Contact): Promise<string> => {
  return await api.post('/api/contact', payload).then((res) => res.data);
};

export const sendHmoApprovalMail = async (
  payload: HmoApproval
): Promise<string> => {
  return await api.post('/api/hmo-approval', payload).then((res) => res.data);
};

export const JobApplicationMail = async (
  payload: JobApplication
): Promise<string> => {
  return await api
    .post('/api/job-application', payload)
    .then((res) => res.data);
};

export const BookAnAppointment = async (
  payload: BookAppointment
): Promise<string> => {
  return await api.post('/api/appointment', payload).then((res) => res.data);
};

export const getPatientExam = async (
  patientno: string,
  token: string
): Promise<PatientExam[]> => {
  return await api
    .get(`/api/patient/${patientno}`, authorizedConfig(token))
    .then((res) => res.data);
};

export const changePassword = async (
  payload: ChangePasswordPayload,
  type: string,
  token: string
): Promise<string> => {
  return await api
    .post(`/api/${type}/change-password`, payload, authorizedConfig(token))
    .then((res) => res.data);
};

export const forgotPassword = async (email: string): Promise<string> => {
  return await api
    .post(`/api/forgot-password/patient`, email)
    .then((res) => res.data);
};
export const forgotPasswordDoctor = async (email: string): Promise<string> => {
  return await api
    .post(`/api/forgot-password/doctor`, email)
    .then((res) => res.data);
};

export const registerPatient = async (
  payload: FormValueType
): Promise<string> => {
  return await api
    .post('/api/patient/register', payload)
    .then((res) => res.data);
};

export const verifyPatient = async (token: string): Promise<string> => {
  return await api
    .post(`/api/email-verification/patient/${token}`)
    .then((res) => res.data);
};

export const verifyDoctor = async (token: string): Promise<string> => {
  return await api
    .post(`/api/email-verification/doctor/${token}`)
    .then((res) => res.data);
};

export const getDoctorsPatient = async (
  doctorcode: string,
  token: string
): Promise<DoctorPatient[]> => {
  return await api
    .get(`/api/doctor/patients/${doctorcode}`, authorizedConfig(token))
    .then((res) => res.data);
};

export const getDoctorPatientExam = async (
  doctorcode: string,
  patientno: string,
  token: string
): Promise<PatientExam[]> => {
  return await api
    .get(
      `/api/doctor/patients/${doctorcode}/${patientno}`,
      authorizedConfig(token)
    )
    .then((res) => res.data);
};

export const doctorRegister = async (
  payload: DoctorRegister
): Promise<string> => {
  return await api
    .post('/api/doctor/register', payload)
    .then((res) => res.data);
};
export const resetPassword = async (
  token: string,
  newPassword: string,
  type: string
): Promise<string> => {
  return await api
    .post(`/api/forgot-password/${type}/${token}`, { newPassword: newPassword })
    .then((res) => res.data);
};
