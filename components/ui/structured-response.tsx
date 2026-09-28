'use client';

import React from 'react';
import { CheckCircle2, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import { ChatMessage } from '@/lib/types';
import { JurisdictionBadge } from './jurisdiction-badge';
import { VoiceOutput } from './voice-output';
import { getChatLabels } from '@/lib/i18n/chatResponses';

interface StructuredResponseProps {
  msg: ChatMessage;
}

export function StructuredResponse({ msg }: StructuredResponseProps) {
  const sr = msg.structuredResponse;
  if (!sr) return null;

  const lang = sr.responseLanguage || msg.responseLanguage || 'en';
  const labels = getChatLabels(lang);

  return (
    <div className="mt-3 pt-3 border-t border-slate-100 space-y-4 text-xs">
      {/* What I Understood */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
        <span className="font-bold text-slate-900 block flex items-center gap-1.5">{labels.whatIUnderstood}</span>
        <p className="text-slate-600">{sr.understood}</p>
        <p className="text-slate-500 font-medium text-[11px]">
          <strong>{labels.contextAppliedTo}</strong> {sr.appliesTo}
        </p>
      </div>

      {/* Verified Schemes */}
      <div className="space-y-2">
        <span className="font-bold text-slate-900 block">
          {labels.verifiedServices} ({sr.schemes.length}):
        </span>
        <div className="space-y-2">
          {sr.schemes.map((rec) => (
            <div key={rec.serviceId} className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-1.5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h5 className="font-bold text-slate-900 text-xs">{rec.service.name}</h5>
                <JurisdictionBadge level={rec.service.jurisdictionLevel} states={rec.service.applicableStates} status={rec.service.status} />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{rec.service.description}</p>
              <div className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                {labels.benefit} {rec.service.benefitsSummary}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                {rec.service.sourceUrl && (
                  <a
                    href={rec.service.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-indigo-700 hover:text-indigo-900 bg-white px-2 py-0.5 rounded border border-indigo-200 hover:bg-indigo-50 transition"
                  >
                    <span>Official Info</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {rec.service.applicationUrl && (
                  <a
                    href={rec.service.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-100/60 px-2 py-0.5 rounded border border-emerald-300 hover:bg-emerald-100 transition"
                  >
                    <span>Apply Online</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why it matches */}
      <div className="space-y-1">
        <span className="font-bold text-slate-900 block">{labels.whyMatches}</span>
        <ul className="space-y-1 text-slate-600">
          {sr.why.map((r, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Required Documents */}
      <div className="space-y-1">
        <span className="font-bold text-slate-900 block">{labels.requiredDocuments}</span>
        <div className="flex flex-wrap gap-1.5">
          {sr.documentsNeeded.map((doc, idx) => (
            <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[11px] font-medium border border-slate-200">
              <FileText className="w-3 h-3 text-slate-500" />
              <span>{doc}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-1">
        <span className="font-bold text-slate-900 block">{labels.nextSteps}</span>
        <ol className="space-y-1 text-slate-700">
          {sr.nextSteps.map((step, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Footer */}
      <div className="pt-2 flex items-center justify-between border-t border-slate-100">
        <VoiceOutput text={`${msg.text}. ${sr.why.join('. ')}`} />
        <span className="text-[10px] text-slate-400 italic">{labels.officialSource} {sr.officialSource}</span>
      </div>
    </div>
  );
}
