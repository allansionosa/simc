'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DateTimePicker } from '@/components/ui/date-time-picker/date-time-picker';

const hmoProviders = [
  'Maxicare',
  'Intellicare',
  'Medicard',
  'PhilCare',
  'Other',
];

export default function HMOApprovalForm() {
  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: undefined as Date | undefined,
    email: '',
    contact: '',
    hmoProvider: undefined as string | undefined,
    company: '',
    healthCard: null as File | null,
    validId: null as File | null,
    agree: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      setForm((f) => ({ ...f, [name]: checked }));
    } else if (type === 'file') {
      setForm((f) => ({ ...f, [name]: files?.[0] ?? null }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSelect = (name: string, value: string) => {
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const newErrors: { [k: string]: string } = {};
    if (!form.firstName) newErrors.firstName = 'Required';
    if (!form.lastName) newErrors.lastName = 'Required';
    if (!form.dob) newErrors.dob = 'Required';
    if (!form.email) newErrors.email = 'Required';
    if (!form.contact) newErrors.contact = 'Required';
    if (!form.hmoProvider) newErrors.hmoProvider = 'Required';
    if (!form.healthCard) newErrors.healthCard = 'Required';
    if (!form.validId) newErrors.validId = 'Required';
    if (!form.agree) newErrors.agree = 'You must agree to the terms.';
    // File size/type checks
    [
      { key: 'healthCard', file: form.healthCard },
      { key: 'validId', file: form.validId },
    ].forEach(({ key, file }) => {
      if (file) {
        if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
          newErrors[key] = 'Only jpeg, jpg, png files allowed.';
        } else if (file.size > 500 * 1024) {
          newErrors[key] = 'File size must be 500kb or less.';
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Form submitted! (Demo)');
    }, 1200);
  };

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
            <form
              className="space-y-7"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="firstName" className="mb-1 inline-block">
                    First Name
                  </Label>
                  <Input
                    placeholder=" first name"
                    id="firstName"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleInput}
                    className={errors.firstName ? 'border-red-400' : ''}
                  />
                  {errors.firstName && (
                    <span className="text-xs text-red-500">
                      {errors.firstName}
                    </span>
                  )}
                </div>
                <div>
                  <Label htmlFor="middleName" className="mb-1 inline-block">
                    Middle Name
                  </Label>
                  <Input
                    id="middleName"
                    name="middleName"
                    placeholder=" middle name"
                    value={form.middleName}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="mb-1 inline-block">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder=" last name"
                    value={form.lastName}
                    onChange={handleInput}
                    className={errors.lastName ? 'border-red-400' : ''}
                  />
                  {errors.lastName && (
                    <span className="text-xs text-red-500">
                      {errors.lastName}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="dob" className="mb-1 inline-block">
                    Date of Birth
                  </Label>
                  <DateTimePicker
                    selectedDate={form.dob}
                    onSelect={(date) => setForm((f) => ({ ...f, dob: date }))}
                    fromYear={1940}
                    toYear={new Date().getFullYear()}
                    label="Select date of birth"
                    disableFutureDates={true}
                  />
                  {errors.dob && (
                    <span className="text-xs text-red-500">{errors.dob}</span>
                  )}
                </div>
                <div>
                  <Label htmlFor="email" className="mb-1 inline-block">
                    Email Address
                  </Label>
                  <Input
                    placeholder=" email address"
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleInput}
                    className={errors.email ? 'border-red-400' : ''}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500">{errors.email}</span>
                  )}
                </div>
                <div>
                  <Label htmlFor="contact" className="mb-1 inline-block">
                    Contact No.
                  </Label>
                  <Input
                    placeholder=" contact number"
                    id="contact"
                    name="contact"
                    value={form.contact}
                    onChange={handleInput}
                    className={errors.contact ? 'border-red-400' : ''}
                  />
                  {errors.contact && (
                    <span className="text-xs text-red-500">
                      {errors.contact}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hmoProvider" className="mb-1 inline-block">
                    HMO Provider
                  </Label>
                  <Select
                    value={form.hmoProvider}
                    onValueChange={(val) => handleSelect('hmoProvider', val)}
                  >
                    <SelectTrigger id="hmoProvider">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {hmoProviders.map((hmo) => (
                        <SelectItem key={hmo} value={hmo}>
                          {hmo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.hmoProvider && (
                    <span className="text-xs text-red-500">
                      {errors.hmoProvider}
                    </span>
                  )}
                </div>
                <div>
                  <Label htmlFor="company" className="mb-1 inline-block">
                    Company
                  </Label>
                  <Input
                    placeholder=" company"
                    id="company"
                    name="company"
                    value={form.company}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="healthCard" className="mb-1 inline-block">
                    Physical/Virtual Health Card
                  </Label>
                  <Input
                    id="healthCard"
                    type="file"
                    name="healthCard"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleInput}
                    className="file:bg-primary file:text-white file:rounded  file:px-4 file:font-semibold file:border-0 file:mr-4"
                  />
                  <span className="text-xs text-gray-500 block mt-1">
                    Only jpeg, jpg, png files. Maximum file size is 500kb
                  </span>
                  {errors.healthCard && (
                    <span className="text-xs text-red-500">
                      {errors.healthCard}
                    </span>
                  )}
                </div>
                <div>
                  <Label htmlFor="validId" className="mb-1 inline-block">
                    Valid ID
                  </Label>
                  <Input
                    id="validId"
                    type="file"
                    name="validId"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleInput}
                    className="file:bg-primary file:text-white file:rounded  file:px-4 file:font-semibold file:border-0 file:mr-4"
                  />
                  <span className="text-xs text-gray-500 block mt-1">
                    Only jpeg, jpg, png files. Maximum file size is 500kb
                  </span>
                  {errors.validId && (
                    <span className="text-xs text-red-500">
                      {errors.validId}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-2">
                <div className="flex items-center">
                  <Checkbox
                    id="agree"
                    checked={form.agree}
                    onCheckedChange={(checked: boolean) =>
                      setForm((f) => ({ ...f, agree: !!checked }))
                    }
                    className="mr-2 accent-primary"
                  />
                  <Label htmlFor="agree" className="text-sm font-normal">
                    I agree to the{' '}
                    <a href="#" className="text-primary underline">
                      Terms and Conditions
                    </a>{' '}
                    and the{' '}
                    <a href="#" className="text-primary underline">
                      Privacy Policy
                    </a>
                    .
                  </Label>
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-40 mt-2 md:mt-0"
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
              {errors.agree && (
                <span className="text-xs text-red-500 block">
                  {errors.agree}
                </span>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
