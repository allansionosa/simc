'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { JobApplicationMail, uploadImage } from '@/app/api';

const applicationSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  contactNo: z.string().min(1, 'Contact number is required'),
  jobPosition: z.string().min(1, 'Position is required'),
  message: z.string().optional(),
  attachment: z
    .custom<FileList>(
      (file) => file instanceof FileList && file.length === 1,
      'Attachment is required'
    )
    .refine((file) => {
      if (!(file instanceof FileList) || file.length === 0) return false;
      const f = file[0];
      const allowed = ['image/jpeg', 'image/png', 'application/pdf'];
      return allowed.includes(f.type) && f.size <= 500 * 1024;
    }, 'File must be jpg, png, or pdf and 500KB or less'),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface JobApplicationFormProps {
  jobTitle: string;
}

export default function JobApplicationForm({
  jobTitle,
}: JobApplicationFormProps) {
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      contactNo: '',
      jobPosition: jobTitle,
      message: '',
      attachment: undefined,
    },
    mode: 'onChange',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileList(files);
      form.setValue('attachment', files);
    }
  };

  const onSubmit = async (data: ApplicationFormData) => {
    setLoading(true);
    try {
      if (!fileList || fileList.length === 0)
        throw new Error('Attachment is required');
      const formData = new FormData();
      formData.append('file', fileList[0]);
      const uploaded = await uploadImage(formData, 'career');
      await JobApplicationMail({
        fullName: data.fullName,
        email: data.email,
        contactNo: data.contactNo,
        jobPosition: data.jobPosition,
        message: data.message || '',
        attachment: uploaded,
      });
      setSubmitSuccess(true);
      form.reset();
      setFileList(null);
      setFileInputKey(Date.now());
    } catch {
      alert('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitSuccess) {
    return (
      <Card className="shadow-lg border border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Application Submitted!
            </h2>
            <p className="text-green-700 mb-6">
              Thank you for applying for the {jobTitle} position. We will review
              your application and contact you soon.
            </p>
            <Button
              onClick={() => {
                setSubmitSuccess(false);
                form.reset();
                form.setValue('jobPosition', jobTitle);
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              Submit Another Application
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-primary">
          Apply for {jobTitle}
        </CardTitle>
        <p className="text-gray-600">
          Please fill out the form below to submit your application.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} required />
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
                    <Input type="email" {...field} required />
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
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobPosition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position Applying For</FormLabel>
                  <FormControl>
                    <Input {...field} required readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Letter / Message</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="attachment"
              render={({ field: { name, onBlur, ref } }) => (
                <FormItem>
                  <FormLabel>Attachment (Resume/CV)</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleFileChange}
                      key={fileInputKey}
                      name={name}
                      onBlur={onBlur}
                      ref={ref}
                    />
                  </FormControl>
                  <p className="text-xs text-gray-500">
                    Only jpg, png, or pdf files. Max size 500KB.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              size="lg"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
