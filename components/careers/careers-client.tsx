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

export default function CareersClient({ jobs }: { jobs: Careers[] }) {
  const [showForm, setShowForm] = useState(false);
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
      jobPosition: '',
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

  const handleApply = (jobTitle: string) => {
    form.setValue('jobPosition', jobTitle);
    setShowForm(true);
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Application Submitted!
          </h2>
          <p className="mb-6">
            Thank you for applying. We will review your application and contact
            you soon.
          </p>
          <Button
            onClick={() => {
              setSubmitSuccess(false);
              setShowForm(false);
            }}
          >
            Submit Another Application
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col items-center px-2">
        <div className="max-w-4xl w-full grid gap-8">
          {jobs.map((job) => (
            <Card key={job.title} className="shadow-lg border border-gray-200">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-primary mb-1">
                    {job.title}
                  </CardTitle>
                  <div className="text-gray-600 text-sm font-normal">
                    {job.location} &middot; {job.employmentType}
                  </div>
                </div>
                <Button onClick={() => handleApply(job.title)}>Apply</Button>
              </CardHeader>
              <CardContent>
                <div
                  className="tiptap-content"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => setShowForm(false)}
              aria-label="Close"
            >
              &times;
            </button>

            <Form {...form}>
              <form
                className="space-y-5"
                onSubmit={form.handleSubmit(onSubmit)}
              >
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
                  className="w-full mt-2"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}
