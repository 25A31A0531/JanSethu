'use client';

import React from 'react';
import { EligibilityConfidence } from '@/lib/types';

interface EligibilityBadgeProps {
  potentialEligibility: EligibilityConfidence;
  confidenceScore: number;
}

export function EligibilityBadge({ potentialEligibility, confidenceScore }: EligibilityBadgeProps) {
  const badgeStyle =
    potentialEligibility === 'High'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : potentialEligibility === 'Medium'
      ? 'bg-amber-50 text-amber-700 border-amber-200'
      : 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badgeStyle}`}>
      {potentialEligibility} Eligibility ({confidenceScore}%)
    </span>
  );
}
