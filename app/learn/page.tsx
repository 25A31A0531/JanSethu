'use client';

import React from 'react';
import { BookOpen, ExternalLink, Shield, Globe2 } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { LearnCard } from '@/components/ui/learn-card';
import { LEARN_TOPICS } from '@/lib/learnTopics';

const OFFICIAL_PORTALS = [
  { name: 'National Portal of India', url: 'https://india.gov.in', desc: 'Central government portal' },
  { name: 'DigiLocker', url: 'https://www.digilocker.gov.in', desc: 'Digital documents' },
  { name: 'Scholarships Portal', url: 'https://scholarships.gov.in', desc: 'NSP scholarships' },
  { name: 'PMFBY Portal', url: 'https://pmfby.gov.in', desc: 'Crop insurance' },
  { name: 'Service Online', url: 'https://serviceonline.gov.in', desc: 'State services' },
  { name: 'data.gov.in', url: 'https://data.gov.in', desc: 'Open government data' },
];

export default function LearnPage() {
  const { t } = useLanguage();

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg, #f0f7ff 0%, #f8fafc 50%, #f0fdf8 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* ── Page Header ── */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{
              background: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(99,102,241,0.2)',
              color: '#4338ca',
              boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
            }}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Civic Literacy & Process Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            {t.learn.title}
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">{t.learn.subtitle}</p>
        </div>

        {/* ── Learn Cards Grid ── */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-blue-600 to-teal-500" />
            <h2 className="text-xl font-bold text-slate-900">Guides & Explainers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {LEARN_TOPICS.map((topic) => (
              <div
                key={topic.id}
                className="bg-white rounded-2xl border border-slate-100 transition-all hover:shadow-lg hover:-translate-y-0.5"
                style={{ boxShadow: '0 2px 8px rgba(15,23,42,0.04)' }}
              >
                <LearnCard topic={topic} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Official Portals ── */}
        <div
          className="rounded-3xl p-8 sm:p-10"
          style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)' }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <Shield className="w-3.5 h-3.5" />
                Official Portals Reference
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Access Legitimate Government Infrastructure</h3>
              <p className="text-sm text-slate-400 max-w-xl">
                Always verify your applications on official portals. JANSETU provides guidance — final submission must be on designated ministry portals.
              </p>
            </div>
            <Globe2 className="w-12 h-12 text-blue-400 shrink-0 hidden md:block opacity-60" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {OFFICIAL_PORTALS.map((portal) => (
              <a
                key={portal.url}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-3 rounded-xl transition-all group"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-blue-300 transition">{portal.name}</div>
                  <div className="text-xs text-slate-500">{portal.desc}</div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
