'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { Recommendation, CitizenProfile } from '@/lib/types';
import { useLanguage } from '@/components/LanguageProvider';

interface TrustPanelProps {
  recommendation: Recommendation;
  profile: CitizenProfile;
}

export function TrustPanel({ recommendation, profile }: TrustPanelProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const { service, potentialEligibility, confidenceScore, matchReasons, cautions } = recommendation;

  const badgeColor = potentialEligibility === 'High'
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : potentialEligibility === 'Medium'
    ? 'bg-amber-50 text-amber-700 border-amber-200'
    : 'bg-blue-50 text-blue-700 border-blue-200';

  const badgeLabel = potentialEligibility === 'High'
    ? 'High Probability Match'
    : potentialEligibility === 'Medium'
    ? 'Moderate Fit'
    : 'Requires Field Verification';

  return (
    <div className="bg-slate-50/80 border border-slate-200 rounded-xl overflow-hidden transition">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-100/70 transition"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-indigo-50 text-indigo-700"><ShieldCheck className="w-4 h-4" /></div>
          <div>
            <span className="text-xs font-semibold text-slate-900 block">{t.journey.trustTitle}</span>
            <span className="text-[11px] text-slate-500">Confidence: {confidenceScore}% • Classification: {potentialEligibility}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${badgeColor}`}>{badgeLabel}</span>
          {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-4 py-3.5 bg-white border-t border-slate-200 space-y-3 text-xs">
          <p className="text-slate-700 leading-relaxed font-normal">
            Recommended because your citizen profile matches key eligibility parameters for{' '}
            <span className="font-semibold text-slate-900">{service.name}</span>{' '}
            {recommendation.jurisdictionBasis === 'central'
              ? `under Central / All-India jurisdiction`
              : recommendation.jurisdictionBasis === 'study'
              ? `based on study jurisdiction (${recommendation.matchedLocationState || profile.studyState || profile.residenceState})`
              : recommendation.jurisdictionBasis === 'employment'
              ? `based on employment jurisdiction (${recommendation.matchedLocationState || profile.employmentState || profile.residenceState})`
              : recommendation.jurisdictionBasis === 'property'
              ? `based on property location (${recommendation.matchedLocationState || profile.propertyState || profile.residenceState})`
              : recommendation.jurisdictionBasis === 'agriculture'
              ? `based on agricultural land location (${recommendation.matchedLocationState || profile.agricultureState || profile.residenceState})`
              : recommendation.jurisdictionBasis === 'business'
              ? `based on enterprise registration location (${recommendation.matchedLocationState || profile.businessState || profile.residenceState})`
              : `based on state domicile (${recommendation.matchedLocationState || profile.residenceState})`
            }, income ceiling, and stated life situation.
          </p>

          {matchReasons && matchReasons.length > 0 && (
            <div className="space-y-1.5">
              <span className="font-semibold text-slate-800 text-[11px] uppercase tracking-wider block">Positive Match Factors:</span>
              <ul className="space-y-1">
                {matchReasons.map((r, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" /><span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {cautions && cautions.length > 0 && (
            <div className="space-y-1.5">
              <span className="font-semibold text-slate-800 text-[11px] uppercase tracking-wider block">Important Caveats:</span>
              <ul className="space-y-1">
                {cautions.map((c, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-amber-700">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" /><span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="p-2.5 bg-slate-50 rounded-lg text-[11px] text-slate-500 border border-slate-100 flex items-start gap-2">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>JANSETU computes recommendations using transparent eligibility rules. Final sanction is subject to statutory verification.</span>
          </div>
        </div>
      )}
    </div>
  );
}
