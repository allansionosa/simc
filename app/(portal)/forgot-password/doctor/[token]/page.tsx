import { notFound } from 'next/navigation';
import { DoctorForgotPasswordClient } from '../doctor-forgot-password';

export default async function DoctorForgotPassword({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const token = (await params).token;

  // Try to decode the token if it's URL encoded
  const decodedToken = decodeURIComponent(token);

  if (decodedToken.length !== 36) {
    notFound();
  }

  return <DoctorForgotPasswordClient token={decodedToken} />;
}
