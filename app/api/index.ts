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
