'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Share2, Printer, CheckCircle2 } from 'lucide-react';

interface JourneyHeaderProps {
  originalQuery: string;
  copied: boolean;
  onShare: () => void;
  onPrint: () => void;
  title: string;
}

export function JourneyHeader({ originalQuery, copied, onShare, onPrint, title }: JourneyHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <Link
          href="/journey"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Journeys</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={onShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Link Copied!' : 'Share Plan'}</span>
          </button>
          <button
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Roadmap</span>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Action Plan Generated • Jurisdiction Verified</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          {title}
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 italic max-w-3xl">
          Original Query: “{originalQuery}”
        </p>
      </div>
    </div>
  );
}
