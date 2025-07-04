import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/result/auth`,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
  },
  withCredentials: true,
});

export const refreshToken = async (
  type: string,
  cookie: string
): Promise<AuthResponseTypes> => {
  return await api
    .get(`${type}/refresh-token`, {
      headers: {
        Authorization: `Session ${cookie}`,
      },
      withCredentials: true,
    })
    .then((res) => res.data);
};

export const logout = async (type: string) => {
  return await api.post(`${type}/logout`, {}).then((res) => res.data);
};

export const login = async (
  payload: LoginTypes,
  type: string
): Promise<AuthResponseTypes> => {
  return await api.post(`${type}/login`, payload).then((res) => res.data);
};

export const doctorRefreshToken = async (
  cookie: string
): Promise<AuthDoctorResponseTypes> => {
  return await api
    .get(`doctor/refresh-token`, {
      headers: {
        Authorization: `Session ${cookie}`,
      },
      withCredentials: true,
    })
    .then((res) => res.data);
};

export const doctorLogin = async (
  payload: LoginTypes
): Promise<AuthDoctorResponseTypes> => {
  return await api.post(`doctor/login`, payload).then((res) => res.data);
};
