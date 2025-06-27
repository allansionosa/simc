'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DateTimePicker } from '@/components/ui/date-time-picker/date-time-picker';
import { Stethoscope } from 'lucide-react';

const departments = [
  {
    name: 'Internal Medicine',
    description: 'General health check-ups and consultations',
    icon: Stethoscope,
  },
  {
    name: 'Cardiology',
    description: 'Heart and cardiovascular care',
    icon: Stethoscope,
  },
  {
    name: 'Pediatrics',
    description: 'Child and adolescent healthcare',
    icon: Stethoscope,
  },
  {
    name: 'Orthopedics',
    description: 'Bone and joint care',
    icon: Stethoscope,
  },
];

const timeSlots = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
];

const AppointmentPage = () => {
  const [date, setDate] = useState<Date>();
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-sky-100 via-sky-200 to-white py-12 md:py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-accent uppercase font-medium tracking-widest text-base mb-2">
              Schedule Your Visit
            </h1>
            <h2 className="font-heading text-3xl md:text-5xl text-primary font-bold mb-4">
              Book an Appointment
            </h2>
            <p className="text-muted text-base md:text-lg mb-6 max-w-xl">
              Schedule your appointment with our experienced medical
              professionals. We&apos;re here to provide you with the best
              healthcare services.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src="/appointment.jpg"
              alt="Medical Consultation"
              width={400}
              height={400}
              className="rounded-xl shadow-lg object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Appointment Form Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-lg">
            <CardContent className="p-6 md:p-8">
              <form className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary">
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary">
                    Appointment Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Select
                        value={selectedDepartment}
                        onValueChange={setSelectedDepartment}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept.name} value={dept.name}>
                              {dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <DateTimePicker
                        selectedDate={date}
                        onSelect={setDate}
                        fromYear={new Date().getFullYear()}
                        toYear={new Date().getFullYear() + 1}
                        label="Select appointment date"
                        disablePastDates={true}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Time Slot</Label>
                      <Select
                        value={selectedTime}
                        onValueChange={setSelectedTime}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason for Visit</Label>
                      <Textarea
                        id="reason"
                        placeholder="Briefly describe your reason for visit"
                        className="h-[100px]"
                      />
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-accent hover:bg-accent/90">
                  Schedule Appointment
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Our Departments
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept) => (
              <Card
                key={dept.name}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <dept.icon className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {dept.name}
                  </h3>
                  <p className="text-gray-600">{dept.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-accent py-10">
        <div className="container mx-auto text-center">
          <h4 className="font-heading text-2xl text-white mb-2">
            Need Immediate Assistance?
          </h4>
          <p className="text-white/90 mb-4">
            Contact our appointment desk for urgent scheduling or inquiries.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-accent font-semibold px-6 py-2 rounded shadow hover:bg-slate-100 transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default AppointmentPage;
