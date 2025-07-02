'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CustomDatePicker } from '@/components/ui/custom-date-picker';
import { CustomTimePicker } from '@/components/ui/custom-time-picker';
import { BookAnAppointment } from '@/app/api';

// Zod schema for appointment form validation
const appointmentSchema = z.object({
  firstname: z.string().min(2, 'First name must be at least 2 characters'),
  lastname: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  contactNo: z.string().min(10, 'Contact number must be at least 10 digits'),
  department: z.string().min(1, 'Please select a department'),
  preferredDate: z.date({
    required_error: 'Please select a preferred date',
  }),
  timeSlot: z.string().min(1, 'Please select a time slot'),
  description: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface AppointmentFormProps {
  departments: Array<{
    name: string;
    description: string;
  }>;
  timeSlots: string[];
}

export default function AppointmentForm({
  departments,
  timeSlots,
}: AppointmentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      contactNo: '',
      department: '',
      preferredDate: undefined,
      timeSlot: '',
      description: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Format the date to YYYY-MM-DD string
      const formattedDate = data.preferredDate.toISOString().split('T')[0];

      const appointmentData = {
        ...data,
        preferredDate: formattedDate,
      };

      await BookAnAppointment(appointmentData);
      setSubmitStatus('success');
      form.reset();
    } catch (error) {
      console.error('Error booking appointment:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <Card className="border-none shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
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
            <h3 className="text-2xl font-bold text-primary mb-2">
              Appointment Booked Successfully!
            </h3>
            <p className="text-gray-600 mb-6">
              Thank you for booking your appointment. We will send you a
              confirmation email shortly.
            </p>
            <Button
              onClick={() => setSubmitStatus('idle')}
              className="bg-accent hover:bg-accent/90"
            >
              Book Another Appointment
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none shadow-lg">
      <CardContent className="p-6 md:p-8">
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">
              Sorry, there was an error booking your appointment. Please try
              again.
            </p>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <div className="min-h-[20px]">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <div className="min-h-[20px]">
                        <FormMessage />
                      </div>
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
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <div className="min-h-[20px]">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          {...field}
                        />
                      </FormControl>
                      <div className="min-h-[20px]">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Appointment Details */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">
                Appointment Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept.name} value={dept.name}>
                              {dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="min-h-[20px]">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferredDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Date</FormLabel>
                      <FormControl>
                        <CustomDatePicker
                          selectedDate={field.value || undefined}
                          onSelect={field.onChange}
                          placeholder="Select appointment date"
                          disablePastDates={true}
                        />
                      </FormControl>
                      <div className="min-h-[20px]">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="timeSlot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Slot</FormLabel>
                      <FormControl>
                        <CustomTimePicker
                          selectedTime={field.value}
                          onSelect={field.onChange}
                          placeholder="Select time"
                          timeSlots={timeSlots}
                        />
                      </FormControl>
                      <div className="min-h-[20px]">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Visit</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Briefly describe your reason for visit"
                          className="h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <div className="min-h-[20px]">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Booking Appointment...' : 'Schedule Appointment'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
