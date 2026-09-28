'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Map, Sparkles, Plus, ArrowRight, BookOpen } from 'lucide-react';
import { Journey } from '@/lib/types';
import { getSavedJourneys } from '@/lib/storage';
import { useLanguage } from '@/components/LanguageProvider';
import { DemoScenarios } from '@/components/ui/demo-scenarios';
import { JourneyCardItem } from '@/components/ui/journey-card-item';

export default function MyJourneysDashboard() {
  const { t } = useLanguage();
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [mounted, setMounted] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  useEffect(() => {
    setJourneys(getSavedJourneys());
    setMounted(true);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg, #f0f7ff 0%, #f8fafc 50%, #f0fdf8 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Page Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-3"
              style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(37,99,235,0.15)', color: '#1d4ed8' }}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Citizen Journey Tracker</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t.nav.myJourney}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Track and resume your personalized government service action plans.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDemoModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-indigo-700 transition hover:opacity-80"
              style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(99,102,241,0.2)' }}
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>{t.nav.tryDemo}</span>
            </button>
            <Link
              href="/start"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md hover:shadow-lg transition-all"
              style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0d9488 100%)' }}
            >
              <Plus className="w-4 h-4" />
              <span>New Action Plan</span>
            </Link>
          </div>
        </div>

        {/* Journey Cards or Empty State */}
        {mounted && journeys.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {journeys.map((journey) => (
              <div
                key={journey.id}
                className="rounded-2xl overflow-hidden transition-all hover:-translate-y-0.5"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid rgba(226,232,240,0.7)',
                  boxShadow: '0 2px 10px rgba(15,23,42,0.05)',
                }}
              >
                <JourneyCardItem journey={journey} />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center py-24 rounded-3xl text-center"
            style={{ background: 'rgba(255,255,255,0.8)', border: '2px dashed rgba(226,232,240,0.8)' }}
          >
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
              style={{ background: 'linear-gradient(135deg, #eff6ff, #f0fdfa)' }}
            >
              <Map className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Active Journeys Yet</h3>
            <p className="text-sm text-slate-500 max-w-sm mb-8 leading-relaxed">
              Start by describing your situation in everyday language, or try one of our pre-configured demo scenarios.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/start"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all"
                style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0d9488 100%)' }}
              >
                <Map className="w-4 h-4" />
                <span>Start My First Plan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setDemoModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-indigo-700 bg-white border border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Try Demo Scenario</span>
              </button>
              <Link
                href="/discover"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
              >
                <BookOpen className="w-4 h-4" />
                <span>Browse Schemes</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      <DemoScenarios isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} variant="modal" />
    </div>
  );
}
