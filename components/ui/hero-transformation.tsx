'use client';

import React from 'react';
import { MessageSquare, Layers, Compass, ShieldCheck, Award, FileCheck2, ListOrdered } from 'lucide-react';

const TRANSFORMATION_STEPS = [
  { label: 'Citizen Problem', icon: MessageSquare, desc: 'Everyday words' },
  { label: 'Life Event', icon: Layers, desc: 'Multi-label classifier' },
  { label: 'Context', icon: Compass, desc: 'Relative & Needs' },
  { label: 'Jurisdiction', icon: ShieldCheck, desc: 'Central vs State' },
  { label: 'Services', icon: Award, desc: 'Grounded retrieval' },
  { label: 'Documents', icon: FileCheck2, desc: 'Prerequisites' },
  { label: 'Action Plan', icon: ListOrdered, desc: 'Dependency roadmap' },
];

export function HeroTransformationSection({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-8 mb-16">
      <div className="max-w-2xl">
        <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-1">Architectural Shift</span>
        <h2 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">{title}</h2>
        <p className="text-sm text-slate-400 mt-2">{subtitle}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {TRANSFORMATION_STEPS.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3.5 flex flex-col justify-between hover:border-slate-600 transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-slate-400">0{idx + 1}</span>
                <Icon className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white mb-0.5">{step.label}</h4>
                <p className="text-[11px] text-slate-400 leading-tight">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
