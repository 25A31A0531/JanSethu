'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import { DEMO_SCENARIOS } from '@/lib/demoData';
import { saveJourneyToStorage } from '@/lib/storage';
import { buildJourneyFromScenario } from '@/lib/buildDemoJourney';

interface DemoScenariosProps {
  isOpen?: boolean;
  onClose?: () => void;
  variant?: 'modal' | 'inline';
}

export function DemoScenarios({ isOpen, onClose, variant = 'modal' }: DemoScenariosProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleSelectScenario = (scenarioId: string) => {
    const scenario = DEMO_SCENARIOS.find((s) => s.id === scenarioId);
    if (!scenario) return;
    setLoadingId(scenario.id);

    const journey = buildJourneyFromScenario(scenario);
    saveJourneyToStorage(journey);

    if (onClose) onClose();
    if (router) router.push(`/journey/${journey.id}`);
  };

  const content = (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-50 text-indigo-700 rounded-lg"><Sparkles className="w-4 h-4" /></div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Grounded Prototype Demonstrations</h3>
            <p className="text-xs text-slate-500">Evaluated via production jurisdiction & eligibility rules engine</p>
          </div>
        </div>
        {variant === 'modal' && onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {DEMO_SCENARIOS.map((scenario) => (
          <div
            key={scenario.id}
            onClick={() => handleSelectScenario(scenario.id)}
            className="group relative bg-white border border-slate-200 rounded-2xl p-4 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {scenario.badge}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-xs mb-1 group-hover:text-indigo-600 transition">{scenario.title}</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2 mb-3">{scenario.shortDescription}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600 group-hover:translate-x-0.5 transition">
              <span>{loadingId === scenario.id ? 'Evaluating Rules...' : 'Launch Roadmap'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (variant === 'inline') return <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4 sm:p-6">{content}</div>;
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        {content}
      </div>
    </div>
  );
}
