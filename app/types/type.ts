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
