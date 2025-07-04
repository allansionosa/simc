'use client';

import { z } from 'zod';
import ResetPasswordForm, { resetPasswordSchema } from '../resetPasswordForm';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { resetPassword } from '@/app/api';
import { toast } from 'sonner';
import CountDown from '../countdown';

type ResetPassword = z.infer<typeof resetPasswordSchema>;

type PatientForgotPasswordClientProps = {
  token: string;
};
export function PatientForgotPasswordClient({
  token,
}: PatientForgotPasswordClientProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [countdownStarted, setCountdownStarted] = useState(false);

  const handleSubmit = async (
    values: ResetPassword,
    form: UseFormReturn<ResetPassword>
  ) => {
    try {
      setIsLoading(true);
      await resetPassword(token, values.password, 'patient');
      toast('Password Successfully Changed.');
      form.reset();
      setCountdownStarted(true);
    } catch (err: unknown) {
      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response
      ) {
        toast(
          (err as { response?: { data?: string } }).response?.data ||
            'Something went wrong please try again later.'
        );
      } else {
        toast('Something went wrong please try again later.');
      }
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {' '}
      <ResetPasswordForm onSubmit={handleSubmit} loading={isLoading} />
      <CountDown
        countdownStarted={countdownStarted}
        pushTo="/portal/doctor/login"
      />
    </div>
  );
}
