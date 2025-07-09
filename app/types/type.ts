/* eslint-disable @typescript-eslint/no-unused-vars */

type HomeBanner = {
  id: number;
  title: string;
  subTitle: string;
  image: string;
};

type About = {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  image: string;
};

type Services = {
  id: number;
  image: string;
  logo: string;
  title: string;
  description: string;
  slug: string;
};

type News = {
  id: number;
  title: string;
  slug: string;
  description: string;
  type: string;
  image: string;
  addedDate: string;
};

type FAQs = {
  id: number;
  title: string;
  description: string;
};

type Contact = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type Institution = {
  id: number;
  logo: string;
  logoWhite: string;
  address: string;
  facebook: string;
  emailGeneralInfo: string;
  emailCareers: string;
  emailAppointment: string;
  contactNo: string;
  addressLink: string;
};

type CompanyProfile = {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  image: string;
};

type Doctors = {
  id: number;
  name: string;
  image: string;
  specialties: string;
  description: string;
};

type Vision = {
  id: number;
  title: string;
  description: string;
  image: string;
};

type Mission = {
  id: number;
  title: string;
  description: string;
};

type HMO = {
  id: number;
  title: string;
  image: string;
  contactNo: string;
  website: string;
};

type HmoApproval = {
  firstName: string;
  middleName: string | null;
  lastName: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  hmoProvider: string;
  company: string | null;
  healthCard: string;
  validId: string;
};

type Careers = {
  id: number;
  title: string;
  location: string;
  employmentType: string;
  description: string;
  slug: string;
  is_enabled: boolean;
};

type JobApplication = {
  email: string;
  contactNo: string;
  jobPosition: string;
  message: string;
  attachment: string;
  fullName: string;
};

type BookAppointment = {
  firstname: string;
  lastname: string;
  email: string;
  contactNo: string;
  department: string;
  preferredDate: string;
  timeSlot: string;
  description?: string;
};

type AuthResponseTypes = {
  email: string;
  patientno: string;
  token: string;
  access_token: string;
};
type PatientExam = {
  id: number;
  examination: string;
  examid: string;
  filename: string;
  resultdate: string;
};

type ChangePasswordPayload = {
  currentPass: string;
  newPass: string;
  email: string;
};

type LoginTypes = {
  email: string;
  password: string;
};

type FormValueType = {
  firstname: string;
  middlename: string;
  lastname: string;
  patientno: string;
  contactno: string;
  email: string;
  password: string;
};

type DoctorPatient = {
  id: number;
  patientno: string;
  patientname: string;
};

type AuthDoctorResponseTypes = {
  email: string;
  doctorcode: string;
  token: string;
  access_token: string;
};

type DoctorRegister = {
  fname: string;
  mname: string;
  lname: string;
  doctorcode: string;
  email: string;
  contactno: string;
  password: string;
};

type ResetPassword = {
  password: string;
  confirmPassword: string;
};

type TermsPrivacy = {
  id: number;
  termsAndConditions: string;
  privacyPolicy: string;
  termsLastModified: string;
  privacyLastModified: string;
  updatedBy: string | null;
};

type Facilities = {
  id: number;
  image: string;
  title: string;
  description: string;
};

type Header = {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  image: string;
};
