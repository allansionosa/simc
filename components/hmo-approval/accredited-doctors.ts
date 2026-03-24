export type AccreditedDoctor = {
  id: string;
  name: string;
  specialty: string;
};

/** Static list for the public site; replace with API data when the backend is ready. */
export const ACCREDITED_DOCTORS_BY_HMO: Record<string, AccreditedDoctor[]> = {
  Maxicare: [
    {
      id: 'mx-santos',
      name: 'Dr. Maria L. Santos, MD',
      specialty: 'Internal Medicine',
    },
    {
      id: 'mx-reyes',
      name: 'Dr. Juan C. Reyes, MD',
      specialty: 'Family Medicine',
    },
    {
      id: 'mx-tan',
      name: 'Dr. Ana Patricia Tan, MD',
      specialty: 'Obstetrics & Gynecology',
    },
    {
      id: 'mx-delacruz',
      name: 'Dr. Roberto Dela Cruz, MD',
      specialty: 'General Surgery',
    },
    {
      id: 'mx-lim',
      name: 'Dr. Michael Lim, MD',
      specialty: 'Orthopedics',
    },
  ],
  Intellicare: [
    {
      id: 'in-mendoza',
      name: 'Dr. Elena Mendoza, MD',
      specialty: 'Pediatrics',
    },
    {
      id: 'in-bautista',
      name: 'Dr. Carlo Bautista, MD',
      specialty: 'Internal Medicine',
    },
    {
      id: 'in-ong',
      name: 'Dr. Stephanie Ong, MD',
      specialty: 'Dermatology',
    },
    {
      id: 'in-ramos',
      name: 'Dr. Francis Ramos, MD',
      specialty: 'ENT',
    },
  ],
  Medicard: [
    {
      id: 'mc-villanueva',
      name: 'Dr. Isabel Villanueva, MD',
      specialty: 'Cardiology',
    },
    {
      id: 'mc-garcia',
      name: 'Dr. Luis Garcia, MD',
      specialty: 'Gastroenterology',
    },
    {
      id: 'mc-flores',
      name: 'Dr. Karen Flores, MD',
      specialty: 'Obstetrics & Gynecology',
    },
    {
      id: 'mc-ng',
      name: 'Dr. David Ng, MD',
      specialty: 'Ophthalmology',
    },
  ],
  PhilCare: [
    {
      id: 'pc-alvarez',
      name: 'Dr. Miguel Alvarez, MD',
      specialty: 'Internal Medicine',
    },
    {
      id: 'pc-castro',
      name: 'Dr. Rachel Castro, MD',
      specialty: 'Pediatrics',
    },
    {
      id: 'pc-rivera',
      name: 'Dr. James Rivera, MD',
      specialty: 'Urology',
    },
    {
      id: 'pc-torres',
      name: 'Dr. Patricia Torres, MD',
      specialty: 'Endocrinology',
    },
  ],
  Other: [],
};

export function getAccreditedDoctorsForHmo(hmoKey: string): AccreditedDoctor[] {
  return ACCREDITED_DOCTORS_BY_HMO[hmoKey] ?? [];
}

/** Public directory entry derived from accredited lists (single source of truth). */
export type PublicDoctorProfile = AccreditedDoctor & {
  accreditedHmos: string[];
  description: string;
  image: string;
};

const DIRECTORY_IMAGES = ['/doctor1.jpg', '/doctor2.jpg', '/room3.jpg'] as const;

function directoryDescription(name: string, specialty: string): string {
  const short = name.replace(/, MD$/, '').trim();
  return `${short} provides ${specialty.toLowerCase()} care at SIMC, coordinating with patients and referring physicians for clear treatment plans.`;
}

/**
 * All unique physicians across HMO lists, with bios and rotating placeholder images.
 * Replace images with real portraits when available.
 */
export function getPublicDoctorsDirectory(): PublicDoctorProfile[] {
  const merged = new Map<
    string,
    { doc: AccreditedDoctor; hmos: Set<string> }
  >();

  for (const [hmo, list] of Object.entries(ACCREDITED_DOCTORS_BY_HMO)) {
    if (hmo === 'Other') continue;
    for (const doc of list) {
      const prev = merged.get(doc.id);
      if (prev) {
        prev.hmos.add(hmo);
      } else {
        merged.set(doc.id, { doc, hmos: new Set([hmo]) });
      }
    }
  }

  return Array.from(merged.values()).map(({ doc, hmos }, index) => ({
    ...doc,
    accreditedHmos: Array.from(hmos).sort(),
    description: directoryDescription(doc.name, doc.specialty),
    image: DIRECTORY_IMAGES[index % DIRECTORY_IMAGES.length],
  }));
}

export function resolvePhysicianLabel(
  hmoKey: string,
  doctorId: string | undefined,
  doctorNameManual: string | undefined
): string {
  if (hmoKey === 'Other') {
    return (doctorNameManual ?? '').trim();
  }
  const list = getAccreditedDoctorsForHmo(hmoKey);
  const found = list.find((d) => d.id === doctorId);
  return found ? `${found.name} (${found.specialty})` : '';
}
