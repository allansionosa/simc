'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { sendHmoApprovalMail, uploadImage } from '@/app/api';
import { DateInput } from '@/components/ui/date-input';
import {
  getAccreditedDoctorsForHmo,
  resolvePhysicianLabel,
} from '@/components/hmo-approval/accredited-doctors';
import {
  CheckCircle2,
  ClipboardList,
  FileText,
  Info,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const hmoProviders = [
  'Maxicare',
  'Intellicare',
  'Medicard',
  'PhilCare',
  'Other',
] as const;

export default function HMOApprovalForm() {
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [idFileList, setIdFileList] = useState<FileList | null>(null);
  const [idFileInputKey, setIdFileInputKey] = useState(Date.now());
  const isClient = typeof window !== 'undefined';

  const hmoApprovalSchema = z
    .object({
      firstName: z.string().min(1, 'First name is required'),
      middleName: z.string().optional(),
      lastName: z.string().min(1, 'Last name is required'),
      dateOfBirth: z.date({
        required_error: 'Date of birth is required',
      }),
      email: z.string().email('Please enter a valid email address'),
      contactNo: z.string().min(1, 'Contact number is required'),
      hmoProvider: z.string().min(1, 'HMO provider is required'),
      doctorId: z.string().optional(),
      doctorNameManual: z.string().optional(),
      company: z.string().optional(),
      healthCard: z
        .custom<FileList>((file) => {
          if (!isClient) return true;
          return file instanceof FileList && file.length === 1;
        }, 'Health card is required')
        .refine((file) => {
          if (!isClient || !(file instanceof FileList)) return true;
          return file[0].size <= 500 * 1024;
        }, 'Health card must be 500KB or less'),
      validId: z
        .custom<FileList>((file) => {
          if (!isClient) return true;
          return file instanceof FileList && file.length === 1;
        }, 'Valid ID is required')
        .refine((file) => {
          if (!isClient || !(file instanceof FileList)) return true;
          return file[0].size <= 500 * 1024;
        }, 'Valid ID must be 500KB or less'),
      agree: z
        .boolean()
        .refine((val) => val === true, 'You must agree to the terms'),
    })
    .superRefine((data, ctx) => {
      if (!data.hmoProvider) return;
      if (data.hmoProvider === 'Other') {
        const name = data.doctorNameManual?.trim() ?? '';
        if (name.length < 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Enter your attending or preferred physician',
            path: ['doctorNameManual'],
          });
        }
      } else {
        if (!data.doctorId?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Select an HMO-accredited physician',
            path: ['doctorId'],
          });
        }
      }
    });

  const form = useForm<HmoApprovalFormData>({
    resolver: zodResolver(hmoApprovalSchema),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      contactNo: '',
      hmoProvider: '',
      doctorId: '',
      doctorNameManual: '',
      company: '',
      healthCard: undefined,
      validId: undefined,
      agree: false,
    },
    mode: 'onChange',
  });

  type HmoApprovalFormData = z.infer<typeof hmoApprovalSchema>;

  const hmoProvider = form.watch('hmoProvider');
  const accreditedForHmo = useMemo(
    () => getAccreditedDoctorsForHmo(hmoProvider),
    [hmoProvider]
  );

  useEffect(() => {
    form.setValue('doctorId', '');
    form.setValue('doctorNameManual', '');
    form.clearErrors(['doctorId', 'doctorNameManual']);
  }, [hmoProvider, form]);

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

      const attendingPhysician = resolvePhysicianLabel(
        data.hmoProvider,
        data.doctorId,
        data.doctorNameManual
      );

      const apiData: HmoApproval = {
        firstName: data.firstName,
        middleName: data.middleName || null,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth.toISOString().split('T')[0],
        email: data.email,
        contactNo: data.contactNo,
        hmoProvider: data.hmoProvider,
        attendingPhysician,
        doctorId:
          data.hmoProvider !== 'Other' && data.doctorId ? data.doctorId : null,
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
      <main className="bg-surface flex min-h-screen flex-col items-center justify-center px-4 pb-16 pt-8">
        <Card className="w-full max-w-md border-border/80 shadow-lg">
          <CardContent className="pt-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle2 className="h-9 w-9 text-emerald-600" />
              </div>
            </div>
            <h2 className="font-heading mb-2 text-2xl font-bold text-primary">
              Request received
            </h2>
            <p className="text-muted mb-6 text-sm leading-relaxed">
              Your HMO approval request has been submitted. Our team will review
              your documents and contact you if anything else is needed.
            </p>
            <Button
              onClick={() => setSubmitSuccess(false)}
              className="w-full bg-accent hover:bg-accent/90"
            >
              Submit another request
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  const doctorSelectDisabled =
    !hmoProvider || hmoProvider === 'Other' || accreditedForHmo.length === 0;

  return (
    <main className="bg-surface min-h-screen pb-16">
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-sky-50 via-white to-sky-100/80">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          aria-hidden
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234b9cd3' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="container relative mx-auto max-w-4xl px-4 py-12 md:py-16">
          <div className="text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
              Patient services
            </p>
            <h1 className="font-heading mb-4 text-3xl font-bold text-primary md:text-4xl">
              HMO online approval
            </h1>
            <p className="text-muted mx-auto max-w-2xl text-base leading-relaxed md:text-lg">
              Submit your LOA or approval request securely. Select your HMO
              first, then choose from physicians accredited under that plan—just
              like an in-person visit desk.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/90 px-4 py-2 text-sm shadow-sm">
                <ShieldCheck className="h-4 w-4 text-secondary" />
                Encrypted submission
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/90 px-4 py-2 text-sm shadow-sm">
                <Stethoscope className="h-4 w-4 text-secondary" />
                HMO-accredited doctors only
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto mt-10 max-w-4xl px-4">
        {/* <div className="mb-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted md:justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              1
            </span>
            <span className="font-medium text-foreground">HMO & physician</span>
          </div>
          <div className="hidden h-px flex-1 bg-border md:block" />
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted text-xs font-bold text-muted-foreground">
              2
            </span>
            <span>Your details</span>
          </div>
          <div className="hidden h-px flex-1 bg-border md:block" />
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted text-xs font-bold text-muted-foreground">
              3
            </span>
            <span>Documents & send</span>
          </div>
        </div> */}

        <Card className="border-border/80 shadow-lg">
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="font-heading text-2xl text-primary">
              Request form
            </CardTitle>
            <CardDescription className="text-primary/90 leading-relaxed">
              Please submit at least{' '}
              <span className="font-semibold text-primary">
                2 business days before
              </span>{' '}
              your appointment. Questions? See{' '}
              <Link
                href="/about/hmo"
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                accepted HMOs
              </Link>{' '}
              or{' '}
              <Link
                href="/contact"
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                contact us
              </Link>
              .
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-10"
                autoComplete="off"
              >
                <section
                  aria-labelledby="section-coverage"
                  className="rounded-xl border border-border/80 bg-card/50 p-6"
                >
                  <div className="mb-6 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <ClipboardList className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2
                        id="section-coverage"
                        className="font-heading text-lg font-semibold text-primary"
                      >
                        Coverage & attending physician
                      </h2>
                      <p className="text-muted mt-1 text-sm">
                        Choose your HMO first. Only physicians accredited under
                        that plan are shown.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="hmoProvider"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>HMO provider</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-background">
                                <SelectValue placeholder="Select your HMO" />
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
                          <FormDescription>
                            Must match the name on your member ID or LOA.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {hmoProvider === 'Other' ? (
                      <FormField
                        control={form.control}
                        name="doctorNameManual"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Attending or preferred physician
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Dr. Name, specialty"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              For plans not listed, enter the physician on your
                              referral or LOA.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <FormField
                        control={form.control}
                        name="doctorId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Accredited physician</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              disabled={doctorSelectDisabled}
                            >
                              <FormControl>
                                <SelectTrigger
                                  className={cn(
                                    'bg-background',
                                    doctorSelectDisabled && 'opacity-70'
                                  )}
                                >
                                  <SelectValue
                                    placeholder={
                                      !hmoProvider
                                        ? 'Select your HMO first'
                                        : 'Choose a physician'
                                    }
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {accreditedForHmo.map((doc) => (
                                  <SelectItem key={doc.id} value={doc.id}>
                                    {doc.name} — {doc.specialty}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              List shows SIMC physicians accredited for your
                              selected HMO.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  {!hmoProvider ? (
                    <div
                      className="mt-4 flex gap-3 rounded-lg border border-accent/25 bg-accent/5 p-4 text-sm text-foreground"
                      role="status"
                    >
                      <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <p>
                        Start by selecting your HMO. Your physician list updates
                        automatically so you only see accredited options.
                      </p>
                    </div>
                  ) : null}

                  {hmoProvider && hmoProvider !== 'Other' ? (
                    <div
                      className="mt-4 flex gap-3 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted"
                      role="status"
                    >
                      <Stethoscope className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                      <p>
                        {accreditedForHmo.length} accredited{' '}
                        {accreditedForHmo.length === 1
                          ? 'physician'
                          : 'physicians'}{' '}
                        for {hmoProvider}. If yours is not listed, choose{' '}
                        <strong className="text-foreground">Other</strong> under
                        HMO and type the name as on your documents.
                      </p>
                    </div>
                  ) : null}
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <UserRound className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-heading text-lg font-semibold text-primary">
                        Your information
                      </h2>
                      <p className="text-muted text-sm">
                        Use the same details as on your HMO card.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First name</FormLabel>
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
                          <FormLabel>Middle name</FormLabel>
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
                          <FormLabel>Last name</FormLabel>
                          <FormControl>
                            <Input placeholder="Last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of birth</FormLabel>
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="you@example.com"
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
                          <FormLabel>Mobile / phone</FormLabel>
                          <FormControl>
                            <Input placeholder="Contact number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem className="max-w-xl">
                        <FormLabel>Company / employer (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="If applicable" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>

                <Separator />

                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-heading text-lg font-semibold text-primary">
                        Supporting documents
                      </h2>
                      <p className="text-muted text-sm">
                        Clear photos or scans help us process your request
                        faster.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="healthCard"
                      render={({ field: { name, onBlur, ref } }) => (
                        <FormItem>
                          <FormLabel>Physical / virtual health card</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept=".jpg,.jpeg,.png"
                              onChange={handleFileChange}
                              key={fileInputKey}
                              className="cursor-pointer file:mr-4 file:rounded file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground"
                              name={name}
                              onBlur={onBlur}
                              ref={ref}
                            />
                          </FormControl>
                          <p className="text-xs text-muted">
                            JPEG or PNG, max 500 KB per file.
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
                          <FormLabel>Valid government ID</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept=".jpg,.jpeg,.png"
                              onChange={handleValidIdChange}
                              key={idFileInputKey}
                              className="cursor-pointer file:mr-4 file:rounded file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground"
                              name={name}
                              onBlur={onBlur}
                              ref={ref}
                            />
                          </FormControl>
                          <p className="text-xs text-muted">
                            JPEG or PNG, max 500 KB per file.
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </section>

                <div className="flex flex-col gap-6 border-t border-border pt-6 md:flex-row md:items-start md:justify-between">
                  <FormField
                    control={form.control}
                    name="agree"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-snug">
                          <FormLabel className="text-sm font-normal text-foreground">
                            I agree to the{' '}
                            <Link
                              href="/terms-and-conditions"
                              className="font-medium text-accent underline-offset-4 hover:underline"
                            >
                              Terms and Conditions
                            </Link>{' '}
                            and{' '}
                            <Link
                              href="/privacy-policy"
                              className="font-medium text-accent underline-offset-4 hover:underline"
                            >
                              Privacy Policy
                            </Link>
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
                    size="lg"
                    className="w-full shrink-0 bg-accent hover:bg-accent/90 md:w-auto md:min-w-[180px]"
                  >
                    {loading ? 'Submitting…' : 'Submit request'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
