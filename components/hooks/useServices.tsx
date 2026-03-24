// NOTE:
// API-based services fetching is disabled for now so the site can be
// deployed as a static site to Vercel. When your API is ready,
// restore the fetch logic below and remove the dummy data.
//
// export const getServices = async (): Promise<Services[]> => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`, {
//     headers: {
//       'Content-Type': 'application/json',
//       'x-api-key': `${process.env.NEXT_PUBLIC_API_KEY}`,
//     },
//     cache: 'no-store',
//   });
//   if (!res.ok) throw new Error('Failed to fetch data');
//   return res.json();
// };

const dummyServices: Services[] = [
  {
    id: 1,
    image: '/room3.jpg',
    logo: '/logo.png',
    title: 'Outpatient Consultation',
    description:
      'Comprehensive outpatient consultations with SIMC physicians across multiple specialties.',
    slug: 'outpatient-consultation',
    detailIntro:
      'Our outpatient department connects you with experienced specialists in a comfortable setting. Browse the clinics and specialties below, then contact us to book a visit.',
    offerings: [
      {
        id: 'opd-internal-medicine',
        title: 'Internal & Family Medicine',
        description:
          'Preventive care, chronic disease management, and referrals coordinated with our hospital network.',
        note: 'By appointment',
      },
      {
        id: 'opd-pediatrics',
        title: 'Pediatrics',
        description:
          'Well-child visits, growth monitoring, and treatment for common childhood conditions.',
        note: 'By appointment',
      },
      {
        id: 'opd-obgyn',
        title: 'Obstetrics & Gynecology',
        description:
          'Prenatal guidance, women’s health screenings, and gynecologic consultations.',
        note: 'By appointment',
      },
      {
        id: 'opd-surgery',
        title: 'General Surgery (Outpatient)',
        description:
          'Pre-operative assessment and follow-up for surgical care planned with your attending surgeon.',
        note: 'Referral may be required',
      },
      {
        id: 'opd-ent',
        title: 'ENT (Otolaryngology)',
        description:
          'Evaluation of ear, nose, and throat conditions with treatment planning.',
        note: 'By appointment',
      },
      {
        id: 'opd-ophthalmology',
        title: 'Ophthalmology',
        description:
          'Eye health assessments and management of common vision-related concerns.',
        note: 'By appointment',
      },
      {
        id: 'opd-dermatology',
        title: 'Dermatology',
        description:
          'Skin, hair, and nail conditions evaluated in an outpatient setting.',
        note: 'By appointment',
      },
      {
        id: 'opd-orthopedics',
        title: 'Orthopedics',
        description:
          'Musculoskeletal complaints, injury follow-up, and mobility-related consultations.',
        note: 'By appointment',
      },
      {
        id: 'opd-cardiology',
        title: 'Cardiology (Outpatient)',
        description:
          'Heart health reviews and coordination with diagnostic services when indicated.',
        note: 'By appointment',
      },
    ],
  },
  {
    id: 2,
    image: '/room1.jpg',
    logo: '/logo.png',
    title: 'Diagnostic Imaging',
    description:
      'Modern imaging services including X-ray and ultrasound to assist in accurate diagnosis.',
    slug: 'diagnostic-imaging',
    detailIntro:
      'Imaging plays a key role in diagnosis and treatment planning. Our team works with your physician to schedule the right study and deliver timely results.',
    offerings: [
      {
        id: 'img-xray',
        title: 'General Radiography (X-Ray)',
        description:
          'High-quality digital X-ray for bones, chest, and other standard studies as ordered by your doctor.',
      },
      {
        id: 'img-ultrasound',
        title: 'Ultrasound',
        description:
          'Non-invasive imaging for soft tissues, abdominal organs, and other applications per clinical need.',
      },
      {
        id: 'img-portable',
        title: 'Portable Studies (when clinically indicated)',
        description:
          'Bedside or limited mobility imaging arranged through your care team when appropriate.',
        note: 'Hospital-based cases',
      },
      {
        id: 'img-results',
        title: 'Results coordination',
        description:
          'Reports are shared with your referring physician so your care stays connected end to end.',
      },
    ],
  },
  {
    id: 3,
    image: '/room1.jpg',
    logo: '/logo.png',
    title: 'Laboratory Services',
    description:
      'Clinical laboratory testing to support diagnosis, monitoring, and treatment decisions.',
    slug: 'laboratory-services',
    detailIntro:
      'Our laboratory partners with your care team to deliver accurate, timely results. Tests are performed as ordered by your physician and prioritized by clinical need.',
    offerings: [
      {
        id: 'lab-hematology',
        title: 'Hematology',
        description:
          'Complete blood counts, differentials, and related panels used to assess infection, anemia, and blood cell disorders.',
        note: 'Physician order required',
      },
      {
        id: 'lab-chemistry',
        title: 'Clinical chemistry',
        description:
          'Blood chemistry profiles for glucose, lipids, liver and kidney function, electrolytes, and other markers.',
        note: 'Fasting may apply',
      },
      {
        id: 'lab-urinalysis',
        title: 'Urinalysis',
        description:
          'Routine and microscopic urinalysis to support evaluation of kidney and urinary tract health.',
      },
      {
        id: 'lab-microbiology',
        title: 'Microbiology (select tests)',
        description:
          'Culture and sensitivity testing when ordered for suspected infections, subject to availability.',
        note: 'Turnaround varies',
      },
      {
        id: 'lab-immuno',
        title: 'Immunology & serology (select)',
        description:
          'Targeted antibody and antigen tests as indicated by your clinician.',
        note: 'Per physician order',
      },
      {
        id: 'lab-coordination',
        title: 'Specimen collection & handling',
        description:
          'Guidance on proper collection, labeling, and delivery so samples meet quality standards.',
      },
    ],
  },
  {
    id: 4,
    image: '/room3.jpg',
    logo: '/logo.png',
    title: 'Emergency Care',
    description:
      '24/7 emergency assessment and stabilization for urgent medical and surgical conditions.',
    slug: 'emergency-care',
    detailIntro:
      'When minutes matter, our emergency team evaluates your condition, provides initial treatment, and coordinates admission or referral as needed.',
    offerings: [
      {
        id: 'er-triage',
        title: 'Triage & rapid assessment',
        description:
          'Structured intake to identify life-threatening conditions first and assign care priority.',
      },
      {
        id: 'er-acute',
        title: 'Acute medical & surgical evaluation',
        description:
          'Assessment and stabilization for chest pain, breathing difficulty, severe infection, injuries, and other emergencies.',
      },
      {
        id: 'er-trauma-basic',
        title: 'Trauma & wound care (initial)',
        description:
          'Initial management of injuries, bleeding control, splinting, and wound preparation as appropriate.',
      },
      {
        id: 'er-diagnostics',
        title: 'Point-of-care & urgent diagnostics',
        description:
          'Coordination with imaging and laboratory services for time-sensitive tests ordered in the ER.',
      },
      {
        id: 'er-admission',
        title: 'Admission & transfer coordination',
        description:
          'Arranging inpatient beds or transfer to a higher level of care when clinically indicated.',
      },
      {
        id: 'er-followup',
        title: 'Discharge instructions & follow-up',
        description:
          'Clear guidance on medications, warning signs, and outpatient follow-up after emergency care.',
      },
    ],
  },
  {
    id: 5,
    image: '/room1.jpg',
    logo: '/logo.png',
    title: 'Pharmacy',
    description:
      'Medication dispensing, counseling, and support for safe, effective use of prescriptions.',
    slug: 'pharmacy',
    detailIntro:
      'Our pharmacy team works with prescribers and nurses to ensure you receive the right medication, dose, and education for your treatment plan.',
    offerings: [
      {
        id: 'rx-outpatient',
        title: 'Outpatient dispensing',
        description:
          'Filling of physician prescriptions for take-home medications with counseling as needed.',
        note: 'Valid prescription required',
      },
      {
        id: 'rx-inpatient',
        title: 'Inpatient medication services',
        description:
          'Unit-dose and clinical pharmacy support for patients admitted to the hospital.',
      },
      {
        id: 'rx-counseling',
        title: 'Medication counseling',
        description:
          'Guidance on how to take medicines, side effects to watch for, and interactions with food or other drugs.',
      },
      {
        id: 'rx-otc',
        title: 'Over-the-counter guidance',
        description:
          'Advice on non-prescription products when appropriate and consistent with your care plan.',
      },
      {
        id: 'rx-safety',
        title: 'Medication safety & reconciliation',
        description:
          'Review of your medication list during transitions of care to reduce errors and duplications.',
      },
    ],
  },
  {
    id: 6,
    image: '/room3.jpg',
    logo: '/logo.png',
    title: 'Rehabilitation',
    description:
      'Therapeutic programs to restore mobility, strength, and function after illness or injury.',
    slug: 'rehabilitation',
    detailIntro:
      'Rehabilitation services are tailored to your goals—whether recovering from surgery, managing a chronic condition, or regaining independence after an injury.',
    offerings: [
      {
        id: 'rehab-pt',
        title: 'Physical therapy',
        description:
          'Exercise, manual therapy, and gait training to improve movement, balance, and strength.',
        note: 'Referral typically required',
      },
      {
        id: 'rehab-ot',
        title: 'Occupational therapy',
        description:
          'Training in activities of daily living and adaptive strategies for home and work.',
        note: 'Referral typically required',
      },
      {
        id: 'rehab-pain',
        title: 'Pain & mobility programs',
        description:
          'Structured plans to reduce pain and improve function in coordination with your physician.',
      },
      {
        id: 'rehab-postop',
        title: 'Post-operative rehabilitation',
        description:
          'Progressive therapy after orthopedic or general surgery to support safe recovery.',
      },
      {
        id: 'rehab-education',
        title: 'Patient & family education',
        description:
          'Instruction on home exercises, assistive devices, and precautions to support outcomes.',
      },
    ],
  },
];

export const getServices = async (): Promise<Services[]> => {
  return Promise.resolve(dummyServices);
};

export const getServiceBySlug = async (
  slug: string
): Promise<Services | undefined> => {
  const list = await getServices();
  return list.find((s) => s.slug === slug);
};
