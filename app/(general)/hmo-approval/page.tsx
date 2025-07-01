'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { sendHmoApprovalMail, uploadImage } from '@/app/api';
import { DateInput } from '@/components/ui/date-input';

const hmoProviders = [
  'Maxicare',
  'Intellicare',
  'Medicard',
  'PhilCare',
  'Other',
];

// Zod validation schema
const hmoApprovalSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.date({
    required_error: 'Date of birth is required',
  }),
  email: z.string().email('Please enter a valid email address'),
  contactNo: z.string().min(1, 'Contact number is required'),
  hmoProvider: z.string().min(1, 'HMO provider is required'),
  company: z.string().optional(),
  healthCard: z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, 'Health card is required')
    .refine(
      (file) => file.length <= 500 * 1024,
      'Health card must be 500KB or less'
    ),
  validId: z
    .instanceof(FileList)
    .refine((file) => file.length == 1, 'Valid ID is required')
    .refine(
      (file) => file.length <= 500 * 1024,
      'Valid ID must be 500KB or less'
    ),
  agree: z
    .boolean()
    .refine((val) => val === true, 'You must agree to the terms'),
});

type HmoApprovalFormData = z.infer<typeof hmoApprovalSchema>;

export default function HMOApprovalForm() {
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [idFileList, setIdFileList] = useState<FileList | null>(null);
  const [idFileInputKey, setIdFileInputKey] = useState(Date.now());

  const form = useForm<HmoApprovalFormData>({
    resolver: zodResolver(hmoApprovalSchema),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      contactNo: '',
      hmoProvider: '',
      company: '',
      healthCard: undefined,
      validId: undefined,
      agree: false,
    },
    mode: 'onChange',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileList(files);
      form.setValue('healthCard', files);
    }
  };

  const handleValidIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idFiles = e.target.files;
    if (idFiles && idFiles.length > 0) {
      setIdFileList(idFiles);
      form.setValue('validId', idFiles);
    }
  };

  const onSubmit = async (data: HmoApprovalFormData) => {
    setLoading(true);
    try {
      if (!fileList || fileList.length === 0) {
        throw new Error('Health Card is required.');
      } else if (!idFileList || idFileList.length === 0) {
        throw new Error('Valid Id is required.');
      }

      const _fileList = new FormData();
      _fileList.append('file', fileList[0]);
      const _uploadres = await uploadImage(_fileList, 'healthcard');

      const _idFileList = new FormData();
      _idFileList.append('file', idFileList[0]);
      const _idUploadRes = await uploadImage(_idFileList, 'valid-id');
      const apiData: HmoApproval = {
        firstName: data.firstName,
        middleName: data.middleName || null,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth.toISOString().split('T')[0], // Format as YYYY-MM-DD
        email: data.email,
        contactNo: data.contactNo,
        hmoProvider: data.hmoProvider,
        company: data.company || null,
        healthCard: _uploadres,
        validId: _idUploadRes,
      };

      await sendHmoApprovalMail(apiData);
      setSubmitSuccess(true);
      form.reset();
      setFileList(null);
      setIdFileList(null);
      setFileInputKey(Date.now());
      setIdFileInputKey(Date.now());
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pb-10">
        <Card className="max-w-md w-full mx-auto shadow-xl border border-gray-200">
          <CardContent className="pt-6 text-center">
            <div className="mb-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Form Submitted Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your HMO approval request has been submitted. You will receive a
              confirmation email shortly.
            </p>
            <Button onClick={() => setSubmitSuccess(false)} className="w-full">
              Submit Another Request
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pb-10">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-primary/90 to-primary/70 py-14 mb-10 flex items-center justify-center relative overflow-hidden">
        <div className="max-w-2xl w-full mx-auto px-4 text-center z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 relative inline-block">
            HMO Online Approval
            <span className="block h-1 w-16 bg-accent rounded-full mx-auto mt-3"></span>
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-medium mt-2">
            Submit your HMO approval request online for a faster, hassle-free
            experience.
          </p>
        </div>
        {/* Optional: Decorative SVG or icon for extra polish */}
        <svg
          className="absolute bottom-0 left-0 w-full h-8 text-white/10"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M0,224L48,197.3C96,171,192,117,288,117.3C384,117,480,171,576,197.3C672,224,768,224,864,197.3C960,171,1056,117,1152,122.7C1248,128,1344,192,1392,224L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </section>

      {/* Form Section */}
      <div className="w-full flex justify-center">
        <Card className="max-w-4xl w-full mx-auto shadow-xl border border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-primary mb-2">
              Request Form
            </CardTitle>
            <p className="text-gray-600 text-sm font-normal">
              Complete the form to process your HMO approval at least{' '}
              <span className="text-primary font-semibold">
                2 days prior to your visit
              </span>
              .
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-7"
                autoComplete="off"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="middleName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Middle Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Middle name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <DateInput
                            value={field.value ?? undefined}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Email address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact No.</FormLabel>
                        <FormControl>
                          <Input placeholder="Contact number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="hmoProvider"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>HMO Provider</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select provider" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {hmoProviders.map((hmo) => (
                              <SelectItem key={hmo} value={hmo}>
                                {hmo}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Company" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="healthCard"
                    render={({ field: { name, onBlur, ref } }) => (
                      <FormItem>
                        <FormLabel>Physical/Virtual Health Card</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            key={fileInputKey}
                            className="file:bg-primary file:text-white file:rounded file:px-4 file:font-semibold file:border-0 file:mr-4"
                            name={name}
                            onBlur={onBlur}
                            ref={ref}
                          />
                        </FormControl>
                        <p className="text-xs text-gray-500">
                          Only jpeg, jpg, png files. Maximum file size is 500kb
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="validId"
                    render={({ field: { name, onBlur, ref } }) => (
                      <FormItem>
                        <FormLabel>Valid ID</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleValidIdChange}
                            key={idFileInputKey}
                            className="file:bg-primary file:text-white file:rounded file:px-4 file:font-semibold file:border-0 file:mr-4"
                            name={name}
                            onBlur={onBlur}
                            ref={ref}
                          />
                        </FormControl>
                        <p className="text-xs text-gray-500">
                          Only jpeg, jpg, png files. Maximum file size is 500kb
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-2">
                  <FormField
                    control={form.control}
                    name="agree"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal">
                            I agree to the{' '}
                            <a href="#" className="text-primary underline">
                              Terms and Conditions
                            </a>{' '}
                            and the{' '}
                            <a href="#" className="text-primary underline">
                              Privacy Policy
                            </a>
                            .
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-40 mt-2 md:mt-0"
                  >
                    {loading ? 'Submitting...' : 'Submit'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
