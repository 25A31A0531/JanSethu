import { GovernmentService } from '../types';
import { DISASTER_SERVICES } from './services/disaster';
import { EDUCATION_CENTRAL_SERVICES } from './services/educationCentral';
import { EDUCATION_STATE_SERVICES } from './services/educationState';
import { HEALTHCARE_CENTRAL_SERVICES } from './services/healthcareCentral';
import { HEALTHCARE_STATE_SERVICES } from './services/healthcareState';
import { STATE_SCHEMES } from './services/stateSchemes';
import { UT_SCHEMES } from './services/utSchemes';
import { AGRICULTURE_SERVICES } from './services/agriculture';
import { BUSINESS_SERVICES } from './services/business';
import { BEREAVEMENT_SERVICES } from './services/bereavement';
import { HOUSING_SERVICES } from './services/housing';
import { FINANCIAL_SERVICES } from './services/financial';
import { IDENTITY_SERVICES } from './services/identity';
import { EMPLOYMENT_SERVICES } from './services/employment';
import { OTHER_SERVICES } from './services/other';

export const GOVERNMENT_SERVICES: GovernmentService[] = [
  ...DISASTER_SERVICES,
  ...EDUCATION_CENTRAL_SERVICES,
  ...EDUCATION_STATE_SERVICES,
  ...HEALTHCARE_CENTRAL_SERVICES,
  ...HEALTHCARE_STATE_SERVICES,
  ...STATE_SCHEMES,
  ...UT_SCHEMES,
  ...AGRICULTURE_SERVICES,
  ...BUSINESS_SERVICES,
  ...BEREAVEMENT_SERVICES,
  ...HOUSING_SERVICES,
  ...FINANCIAL_SERVICES,
  ...IDENTITY_SERVICES,
  ...EMPLOYMENT_SERVICES,
  ...OTHER_SERVICES,
];
