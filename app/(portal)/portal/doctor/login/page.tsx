'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useDoctorActions } from '@/app/store';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { doctorLogin } from '@/app/api/auth';
import { forgotPassword } from '@/app/api';
import { Spinner } from '@/components/ui/spinner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Button } from '@/components/ui/button';
import ForgotPassword from '@/app/(portal)/forgotPassword';
import { toast } from 'sonner';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'Please input your password' }),
});

type LoginSchema = z.infer<typeof loginSchema>;

type ErrorWithResponse = {
  response?: {
    data?: string;
  };
};

export default function DoctorLogin() {
  const { setDoctor } = useDoctorActions();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmittingForgotPass, setIsSubmittingForgotPass] = useState(false);
  const access_token = Cookies.get('simc_doctor_access_token');

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (access_token) {
      router.push('/portal/doctor');
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = async (values: LoginSchema) => {
    try {
      setIsLoading(true);
      const response = await doctorLogin(values);
      const { email, doctorcode, token, access_token } = response;
      setDoctor(email, doctorcode, token);
      Cookies.set('simc_doctor_access_token', access_token, {
        path: '/',
        expires: 2,
      });
      setIsLoggedIn(true);
      form.reset();
      router.push('/portal/doctor');
    } catch (err: unknown) {
      let errorMsg = 'Something went wrong please try again later';
      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response
      ) {
        errorMsg = (err as ErrorWithResponse).response?.data || errorMsg;
      }
      toast(errorMsg);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = () => {
    form.reset();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitForgotPassword = async (values: { email: string }) => {
    try {
      setIsSubmittingForgotPass(true);
      const response = await forgotPassword(values.email, 'doctor');
      toast(response);
      setIsModalOpen(false);
    } catch (err: unknown) {
      let errorMsg = 'Something went wrong please try again later';
      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response
      ) {
        errorMsg = (err as ErrorWithResponse).response?.data || errorMsg;
      }
      toast(errorMsg);
    } finally {
      setIsSubmittingForgotPass(false);
    }
  };

  return isLoggedIn ? (
    <Spinner />
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Doctor Portal Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your doctor dashboard and patient records
          </p>
        </div>

        <div className="font-semibold">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="grid gap-y-5"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-center">
                <p
                  className="cursor-pointer text-primary underline text-xs"
                  onClick={handleOpenModal}
                >
                  forgot password?
                </p>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </div>
              <Link href="/portal/doctor/register">
                <p className="text-primary text-center mt-10 text-xs">
                  Don&apos;t have an account yet? Register here
                </p>
              </Link>
            </form>
          </Form>
        </div>
        <ForgotPassword
          onSubmit={handleSubmitForgotPassword}
          loading={isSubmittingForgotPass}
          open={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}
