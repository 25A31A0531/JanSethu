'use client';

import React from 'react';
import { ShieldCheck, ExternalLink, AlertCircle, Clock } from 'lucide-react';
import { GovernmentService } from '@/lib/types';
import { verifyServiceSource } from '@/lib/government/verificationService';

interface SourceVerificationCardProps {
  service: GovernmentService;
}

export function SourceVerificationCard({ service }: SourceVerificationCardProps) {
  const verification = verifyServiceSource(service);

  return (
    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 font-bold text-slate-900">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Government Authority & Source</span>
        </div>
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            verification.confidence === 'High'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : verification.confidence === 'Medium'
              ? 'bg-blue-50 text-blue-700 border-blue-200'
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}
        >
          {verification.confidence} Verification
        </span>
      </div>

      <div className="text-[11px] text-slate-600 space-y-1">
        <p>
          <strong className="text-slate-800">Authority:</strong> {service.authority || service.sourceAuthority}
        </p>
        {service.lastVerified && (
          <p className="flex items-center gap-1 text-slate-500">
            <Clock className="w-3 h-3" />
            <span>Last verified against gazette/portal: {service.lastVerified}</span>
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        {service.sourceUrl ? (
          <a
            href={service.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg border border-indigo-200 transition text-[11px]"
          >
            <span>Official Information</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 italic">
            <AlertCircle className="w-3 h-3 text-amber-500" />
            <span>Official source integration pending</span>
          </span>
        )}

        {service.applicationUrl && (
          <a
            href={service.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200 transition text-[11px]"
          >
            <span>Apply Online (Official Portal)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}
