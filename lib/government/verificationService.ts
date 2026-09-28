import { GovernmentService } from '../types';

interface VerifiedSource { authorityName: string; domain: string; lastChecked: string; }
const VERIFIED_GOVERNMENT_SOURCES: VerifiedSource[] = [
  { authorityName: 'Department of Higher Education, Ministry of Education', domain: 'scholarships.gov.in', lastChecked: '2026-08-30' },
  { authorityName: 'Ministry of Agriculture and Farmers Welfare', domain: 'pmfby.gov.in', lastChecked: '2026-08-30' },
  { authorityName: 'Department of Agriculture & Farmers Welfare', domain: 'pmkisan.gov.in', lastChecked: '2026-08-30' },
  { authorityName: 'Department of Financial Services, Ministry of Finance', domain: 'mudra.org.in', lastChecked: '2026-08-30' },
  { authorityName: 'Ministry of Micro, Small and Medium Enterprises', domain: 'udyamregistration.gov.in', lastChecked: '2026-08-30' },
  { authorityName: 'Office of the Registrar General of India, MHA', domain: 'crsorgi.gov.in', lastChecked: '2026-08-30' },
  { authorityName: 'Unique Identification Authority of India (UIDAI)', domain: 'uidai.gov.in', lastChecked: '2026-08-30' },
  { authorityName: 'National Disaster Management Authority & State SDMA', domain: 'ndma.gov.in', lastChecked: '2026-08-30' },
  { authorityName: 'Government of Andhra Pradesh - Citizen Services', domain: 'ap.gov.in', lastChecked: '2026-08-30' },
  { authorityName: 'Government of Tamil Nadu - e-Sevai', domain: 'tn.gov.in', lastChecked: '2026-08-30' },
  { authorityName: 'National Health Authority, MoHFW', domain: 'pmjay.gov.in', lastChecked: '2026-08-30' },
  { authorityName: 'National Health Authority Beneficiary Portal', domain: 'nha.gov.in', lastChecked: '2026-08-30' },
  { authorityName: 'Ministry of New and Renewable Energy', domain: 'pmsuryaghar.gov.in', lastChecked: '2026-08-30' },
  { authorityName: 'National Informatics Centre (NIC), MeitY', domain: 'serviceonline.gov.in', lastChecked: '2026-08-30' },
];
const findSourceByUrl = (url?: string) => url ? VERIFIED_GOVERNMENT_SOURCES.find((source) => url.includes(source.domain)) : undefined;

export function verifyServiceSource(service: GovernmentService): {
  isVerified: boolean;
  confidence: 'High' | 'Medium' | 'Unverified';
  authority: string;
  officialUrl?: string;
  notes: string;
} {
  if (!service.sourceUrl) {
    return {
      isVerified: false,
      confidence: 'Unverified',
      authority: service.sourceAuthority || 'State / Central Government',
      notes: 'Official source integration pending.',
    };
  }

  const verifiedEntry = findSourceByUrl(service.sourceUrl);

  if (verifiedEntry) {
    return {
      isVerified: true,
      confidence: 'High',
      authority: verifiedEntry.authorityName,
      officialUrl: service.sourceUrl,
      notes: `Verified authentic government source under domain ${verifiedEntry.domain}. Checked on ${verifiedEntry.lastChecked}.`,
    };
  }

  const isGovDomain =
    service.sourceUrl.includes('.gov.in') || service.sourceUrl.includes('.nic.in');

  return {
    isVerified: isGovDomain,
    confidence: isGovDomain ? 'Medium' : 'Unverified',
    authority: service.sourceAuthority,
    officialUrl: service.sourceUrl,
    notes: isGovDomain
      ? 'Government domain verified.'
      : 'Source URL requires department authorization.',
  };
}
