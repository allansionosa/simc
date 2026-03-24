import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  FlaskConical,
  Hospital,
  Pill,
  Siren,
  Stethoscope,
  HeartPulse,
} from 'lucide-react';

const SERVICE_ICONS: Record<string, LucideIcon> = {
  'outpatient-consultation': Stethoscope,
  'diagnostic-imaging': Activity,
  'laboratory-services': FlaskConical,
  'emergency-care': Siren,
  pharmacy: Pill,
  rehabilitation: HeartPulse,
};

type Props = {
  slug: string;
  className?: string;
};

export function ServiceCategoryIcon({ slug, className }: Props) {
  const Icon = SERVICE_ICONS[slug] ?? Hospital;
  return <Icon className={className} aria-hidden />;
}
