import { notFound } from 'next/navigation';
import { PatientForgotPasswordClient } from '../patient-forgot-password';

export default async function PatientForgotPassword({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const token = (await params).token;
  if (token.length !== 36) {
    notFound();
  }

  return <PatientForgotPasswordClient token={token} />;
}
