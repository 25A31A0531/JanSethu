'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, GraduationCap, Wheat, Briefcase, HeartHandshake } from 'lucide-react';
import { Journey } from '@/lib/types';

export function JourneyCardItem({ journey }: { journey: Journey }) {
  const completedSteps = journey.steps.filter((s) => s.status === 'completed').length;
  const totalSteps = journey.steps.length;

  const icon = journey.lifeEvent.category === 'education'
    ? <GraduationCap className="w-5 h-5 text-indigo-600" />
    : journey.lifeEvent.category === 'agriculture'
    ? <Wheat className="w-5 h-5 text-emerald-600" />
    : journey.lifeEvent.category === 'business'
    ? <Briefcase className="w-5 h-5 text-amber-600" />
    : <HeartHandshake className="w-5 h-5 text-rose-600" />;

  return (
    <Link
      href={`/journey/${journey.id}`}
      className="group bg-white border border-slate-200 rounded-3xl p-6 shadow-civic-card hover:shadow-civic-card-hover hover:border-indigo-300 transition-all flex flex-col justify-between space-y-4"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="p-2.5 bg-slate-50 rounded-2xl group-hover:bg-indigo-50 transition">{icon}</div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
            {journey.overallProgress}% Completed
          </span>
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition line-clamp-1">
            {journey.title || journey.lifeEvent.name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 italic">“{journey.naturalLanguageInput}”</p>
        </div>
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>{completedSteps} of {totalSteps} steps done</span>
            <span>{journey.documentReadiness.percentage}% docs ready</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: `${journey.overallProgress}%` }} />
          </div>
        </div>
      </div>
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600 group-hover:translate-x-0.5 transition">
        <span>Resume Action Plan</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}
