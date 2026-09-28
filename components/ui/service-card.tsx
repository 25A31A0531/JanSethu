'use client';

import React, { useState } from 'react';
import { Bookmark, PlusCircle, Building2, Sparkles, ChevronRight, CheckCircle2, FileText } from 'lucide-react';
import { GovernmentService, Recommendation, CitizenProfile } from '@/lib/types';
import { DOCUMENT_TYPES } from '@/lib/demoData';
import { TrustPanel } from './trust-panel';
import { JurisdictionBadge } from './jurisdiction-badge';
import { SourceVerificationCard } from './source-verification';
import { EligibilityBadge } from './eligibility-badge';
import { ServiceStepsList } from './service-steps-list';

interface ServiceCardProps {
  recommendation: Recommendation;
  profile: CitizenProfile;
  onSave?: (service: GovernmentService) => void;
  onAddToJourney?: (service: GovernmentService) => void;
  isSaved?: boolean;
}

export function ServiceCard({
  recommendation, profile, onSave, onAddToJourney, isSaved = false,
}: ServiceCardProps) {
  const [saved, setSaved] = useState(isSaved);
  const [added, setAdded] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const { service, potentialEligibility, confidenceScore } = recommendation;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-civic-card hover:shadow-civic-card-hover transition-all space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 flex-wrap">
            <JurisdictionBadge level={service.jurisdictionLevel} states={service.applicableStates} status={service.status} />
            <EligibilityBadge potentialEligibility={potentialEligibility} confidenceScore={confidenceScore} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 leading-snug">{service.name}</h3>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Building2 className="w-3.5 h-3.5" /><span>{service.department}</span><span>• {service.authority}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => { setSaved(!saved); if (onSave) onSave(service); }}
            aria-label="Save Scheme"
            className={`p-2.5 rounded-xl border text-xs font-medium transition ${saved ? 'bg-amber-50 text-amber-700 border-amber-300' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-amber-500 text-amber-500' : ''}`} />
          </button>
          <button
            onClick={() => { setAdded(true); if (onAddToJourney) onAddToJourney(service); }}
            disabled={added}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${added ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'}`}
          >
            {added ? <><CheckCircle2 className="w-3.5 h-3.5" /><span>Added</span></> : <><PlusCircle className="w-3.5 h-3.5" /><span>Add to Journey</span></>}
          </button>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{service.description}</p>
      <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl text-xs flex items-start gap-2.5 text-emerald-950">
        <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div><span className="font-bold block">Sanction & Financial Benefit:</span><span>{service.benefitsSummary}</span></div>
      </div>

      <SourceVerificationCard service={service} />
      <TrustPanel recommendation={recommendation} profile={profile} />

      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Required Documents:</h4>
        <div className="flex flex-wrap gap-2">
          {service.requiredDocuments.map((docId) => {
            const docInfo = DOCUMENT_TYPES.find((d) => d.id === docId);
            const isReady = docInfo?.status === 'ready';
            return (
              <span key={docId} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${isReady ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                <FileText className="w-3 h-3 text-slate-500" /><span>{docInfo?.name || docId}</span>
                {isReady && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
              </span>
            );
          })}
        </div>
      </div>

      {service.steps.length > 0 && (
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <button onClick={() => setShowSteps(!showSteps)} className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
            <span>{showSteps ? 'Hide' : 'View'} Application Procedure ({service.steps.length} Steps)</span>
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showSteps ? 'rotate-90' : ''}`} />
          </button>
        </div>
      )}
      {showSteps && <ServiceStepsList steps={service.steps} />}
    </div>
  );
}
