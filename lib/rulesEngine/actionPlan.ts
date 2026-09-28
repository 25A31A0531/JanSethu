import { CitizenProfile, GovernmentService, JourneyStep } from '../types';
import { DOCUMENT_TYPES } from '../demoData';

/**
 * Generate a Sequenced Action Roadmap with Prerequisites
 */
export function generateActionPlan(
  profile: CitizenProfile,
  services: GovernmentService[]
): JourneyStep[] {
  if (!services || services.length === 0) return [];
  const primaryService = services[0];

  if (primaryService.category === 'disaster' || primaryService.tags.includes('disaster')) {
    return generateDisasterActionPlan(primaryService);
  }

  const steps: JourneyStep[] = [];

  steps.push({
    id: 'step-1', stepNumber: 1, phase: 'Documentation',
    title: 'Prepare & Verify Foundational Revenue Certificates',
    description: `Assemble required credentials: ${primaryService.requiredDocuments
      .map((id) => DOCUMENT_TYPES.find((d) => d.id === id)?.name || id)
      .slice(0, 3).join(', ')}. Ensure active Aadhaar-mobile linkage.`,
    whyItMatters: 'Government departments reject initial applications due to expired annual income certificates or unseeded bank passbooks.',
    requiredDocuments: primaryService.requiredDocuments.slice(0, 2), estimatedEffort: '1-3 business days',
    officialDestination: { name: 'State Revenue / e-District / Meeseva Portal', url: 'https://serviceonline.gov.in', isIntegrationPending: false },
    status: 'completed', dependencies: [], serviceId: primaryService.id,
  });

  steps.push({
    id: 'step-2', stepNumber: 2, phase: 'Preparation',
    title: `Register on ${primaryService.authority}`,
    description: 'Create One-Time Registration (OTR) profile on the official portal using Aadhaar authentication.',
    whyItMatters: 'OTR generates your unique application reference tracking number.',
    requiredDocuments: ['aadhaar', 'bank_passbook'], estimatedEffort: '20-30 minutes',
    officialDestination: { name: primaryService.sourceAuthority, url: primaryService.sourceUrl, isIntegrationPending: !primaryService.sourceUrl },
    status: 'in_progress', dependencies: ['step-1'], serviceId: primaryService.id,
  });

  steps.push({
    id: 'step-3', stepNumber: 3, phase: 'Application',
    title: `Submit Scheme Application for ${primaryService.name}`,
    description: 'Fill in eligibility details, upload verified digital certificates, and submit before cycle deadline.',
    whyItMatters: 'Provides official application acknowledgment receipt for all subsequent verifications.',
    requiredDocuments: primaryService.requiredDocuments, estimatedEffort: '45 minutes',
    officialDestination: { name: primaryService.sourceAuthority, url: primaryService.sourceUrl, isIntegrationPending: !primaryService.sourceUrl },
    status: 'not_started', dependencies: ['step-2'], serviceId: primaryService.id,
  });

  steps.push({
    id: 'step-4', stepNumber: 4, phase: 'Verification',
    title: 'Departmental Verification & Field Endorsement',
    description: 'Verification by Nodal Officer / Tahsildar / Agriculture Assistant as mandated by scheme rules.',
    whyItMatters: 'Mandatory statutory fraud-prevention checkpoint.',
    requiredDocuments: [], estimatedEffort: '5-10 business days',
    officialDestination: { name: 'Local Department / Nodal Officer Desk', isIntegrationPending: true },
    status: 'not_started', dependencies: ['step-3'], serviceId: primaryService.id,
  });

  steps.push({
    id: 'step-5', stepNumber: 5, phase: 'Tracking',
    title: 'Direct Benefit Transfer (DBT) & Benefit Confirmation',
    description: 'Track PFMS payment sanction and credit confirmation to your Aadhaar-seeded bank account.',
    whyItMatters: 'Confirms complete scheme execution and benefit disbursement.',
    requiredDocuments: ['bank_passbook'], estimatedEffort: 'Periodic tracking',
    officialDestination: { name: 'PFMS National Portal', url: 'https://pfms.nic.in', isIntegrationPending: false },
    status: 'not_started', dependencies: ['step-4'], serviceId: primaryService.id,
  });

  return steps;
}


export function generateDisasterActionPlan(primaryService: GovernmentService): JourneyStep[] {
  return [
    {
      id: 'step-1', stepNumber: 1, phase: 'Preparation',
      title: 'Notify Village/Ward Secretariat & Secure Photo Evidence',
      description: 'Report the structure damage to the Village Revenue Officer (VRO) or Ward Administrative Secretary within 72 hours. Capture timestamped photos of damage.',
      whyItMatters: 'Disaster ex-gratia relief requires rapid initial enumeration to establish calamity causality.',
      requiredDocuments: ['aadhaar'], estimatedEffort: 'Immediate (Within 72 hrs)',
      officialDestination: { name: 'Local Village/Ward Secretariat or Tahsildar Office', isIntegrationPending: false },
      status: 'completed', dependencies: [], serviceId: primaryService.id,
    },
    {
      id: 'step-2', stepNumber: 2, phase: 'Documentation',
      title: 'Joint Field Enumeration & VRO Panchanama',
      description: 'Revenue inspector and local disaster officials inspect the site and prepare the damage classification panchanama (Fully/Partially Damaged).',
      whyItMatters: 'The official Panchanama survey report is the statutory basis for treasury compensation release.',
      requiredDocuments: ['disaster_damage_report', 'aadhaar'], estimatedEffort: '3-5 business days',
      officialDestination: { name: 'District Disaster Management Authority (DDMA)', isIntegrationPending: true },
      status: 'in_progress', dependencies: ['step-1'], serviceId: primaryService.id,
    },
    {
      id: 'step-3', stepNumber: 3, phase: 'Verification',
      title: 'Secretariat Social Audit Display',
      description: 'Verify your name and sanction amount on the public social audit notice board at the Grama/Ward Secretariat.',
      whyItMatters: 'Provides transparency and a 48-hour objection window to correct bank account or name mismatches.',
      requiredDocuments: ['bank_passbook'], estimatedEffort: '2 business days',
      officialDestination: { name: 'Grama / Ward Sachivalayam Notice Board', isIntegrationPending: false },
      status: 'not_started', dependencies: ['step-2'], serviceId: primaryService.id,
    },
    {
      id: 'step-4', stepNumber: 4, phase: 'Tracking',
      title: 'SDRF Ex-Gratia Direct Benefit Transfer (DBT)',
      description: 'Relief compensation credited directly to your Aadhaar-linked bank account via the State Disaster Response Fund.',
      whyItMatters: 'Confirms complete financial relief sanction without third-party commission.',
      requiredDocuments: ['bank_passbook'], estimatedEffort: '7-14 business days',
      officialDestination: { name: 'State Disaster Management Fund / PFMS', url: 'https://ndma.gov.in', isIntegrationPending: false },
      status: 'not_started', dependencies: ['step-3'], serviceId: primaryService.id,
    },
  ];
}
