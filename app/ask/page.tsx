'use client';

import React from 'react';
import { JansetuChatbot } from '@/components/ui/chatbot';
import { MessageSquare, Sparkles, ShieldCheck, Globe2, Zap, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

const FEATURE_PILLS = [
  { icon: Globe2, label: '13 Languages' },
  { icon: ShieldCheck, label: 'Verified Data' },
  { icon: Zap, label: 'Instant Results' },
];

export default function AskPage() {
  const { t } = useLanguage();

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg, #f0f7ff 0%, #f8fafc 40%, #f0fdf8 100%)' }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ── Page Header ── */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold"
            style={{
              background: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(99,102,241,0.2)',
              color: '#4338ca',
              boxShadow: '0 2px 8px rgba(99,102,241,0.1)',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Grounded AI Citizen Assistant</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.ask.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.ask.subtitle}
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {FEATURE_PILLS.map((pill) => (
              <div
                key={pill.label}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-slate-600"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  border: '1px solid rgba(226,232,240,0.8)',
                }}
              >
                <pill.icon className="w-3.5 h-3.5 text-blue-500" />
                <span>{pill.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Chatbot ── */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(226,232,240,0.8)',
            boxShadow: '0 8px 40px rgba(15,23,42,0.08)',
          }}
        >
          <JansetuChatbot />
        </div>

        {/* ── Bottom note ── */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-400">
            JANSETU is a prototype. Always verify scheme details on official government portals.
          </p>
        </div>
      </div>
    </div>
  );
}
