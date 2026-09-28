'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight, Search, Mic, Globe2, Shield, ChevronRight,
  GraduationCap, Heart, Leaf, Briefcase, Home, BarChart3, Wind, FileText,
  MessageSquare, Compass, Map, BarChart2
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { VoiceInput } from './voice-input';
import { EXAMPLE_CHIPS, ROTATING_EXAMPLES } from './life-event-examples';
import { OrbitalHub } from './orbital-hub';
import { GOVERNMENT_SERVICES } from '@/lib/demoData';
import { DISCOVER_CATEGORIES } from './discover-filters-bar';

// ─── Trust Strip ──────────────────────────────────────────────────────────────
function TrustStrip() {
  const activeServiceCount = GOVERNMENT_SERVICES.filter(
    (s) => s.status === 'ACTIVE'
  ).length;

  const stats = [
    { icon: Globe2, value: '13', label: 'Indian Languages', color: 'text-blue-600' },
    { icon: Shield, value: String(activeServiceCount), label: 'Active Gov Schemes', color: 'text-teal-600' },
    { icon: ChevronRight, value: 'Verified', label: 'Information', color: 'text-indiaGreen-600' },
    { icon: Map, value: 'Step-by-Step', label: 'Guidance', color: 'text-indigo-600' },
  ];

  return (
    <div className="w-full mt-8">
      <div
        className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 py-3 rounded-2xl"
        style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(226,232,240,0.8)',
          boxShadow: '0 4px 24px rgba(15,23,42,0.06)',
        }}
      >
        {stats.map((stat, i) => (
          <React.Fragment key={stat.label}>
            <div className="flex items-center gap-2 py-1">
              <div className={`w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900">{stat.value}</span>
                <span className="text-xs text-slate-500 ml-1">{stat.label}</span>
              </div>
            </div>
            {i < stats.length - 1 && (
              <div className="hidden sm:block w-px h-6 bg-slate-200" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ─── Hero Search Input ────────────────────────────────────────────────────────
function HeroSearchInput() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((p) => (p + 1) % ROTATING_EXAMPLES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    router.push(`/start?q=${encodeURIComponent(input.trim())}`);
  };

  const handleChipClick = (query: string) => {
    router.push(`/start?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3">
      <form onSubmit={handleSubmit}>
        <div
          className="relative flex items-center rounded-2xl transition-all duration-300"
          style={{
            background: 'rgba(255,255,255,0.97)',
            border: isFocused ? '2px solid #2563eb' : '1.5px solid #e2e8f0',
            boxShadow: isFocused
              ? '0 0 0 4px rgba(37,99,235,0.1), 0 8px 32px rgba(15,23,42,0.08)'
              : '0 4px 16px rgba(15,23,42,0.06)',
          }}
        >
          <Search className="w-5 h-5 text-slate-400 absolute left-4 shrink-0" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={ROTATING_EXAMPLES[placeholderIndex]}
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm sm:text-base font-normal pl-12 pr-4 py-4 focus:outline-none rounded-2xl"
            aria-label="Describe your situation"
          />
          <div className="flex items-center gap-2 absolute right-3">
            <VoiceInput
              onTranscript={(spoken) => {
                setInput(spoken);
                router.push(`/start?q=${encodeURIComponent(spoken)}`);
              }}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex items-center justify-center w-10 h-10 rounded-xl text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0d9488 100%)' }}
              aria-label="Submit"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>

      {/* Example chips */}
      <div className="flex flex-wrap gap-2 justify-center">
        <span className="text-xs text-slate-500 font-medium self-center">Try:</span>
        {EXAMPLE_CHIPS.slice(0, 4).map((chip) => (
          <button
            key={chip.label}
            onClick={() => handleChipClick(chip.query)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 transition-all hover:scale-105 active:scale-100"
            style={{
              background: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(226,232,240,0.9)',
              boxShadow: '0 2px 6px rgba(15,23,42,0.05)',
            }}
          >
            <span>{chip.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Quick Action Strip ────────────────────────────────────────────────────────
function QuickActionStrip() {
  const actions = [
    {
      icon: Search,
      title: 'Find Schemes',
      desc: 'Based on your situation',
      href: '/ask',
      color: '#2563eb',
      bg: 'rgba(37,99,235,0.07)',
    },
    {
      icon: Shield,
      title: 'Check Eligibility',
      desc: 'Instant and accurate',
      href: '/ask',
      color: '#0d9488',
      bg: 'rgba(13,148,136,0.07)',
    },
    {
      icon: FileText,
      title: 'Get Document List',
      desc: 'Know what you need',
      href: '/documents',
      color: '#7c3aed',
      bg: 'rgba(124,58,237,0.07)',
    },
    {
      icon: Map,
      title: 'Step-by-Step Process',
      desc: 'From confusion to clarity',
      href: '/journey',
      color: '#d97706',
      bg: 'rgba(217,119,6,0.07)',
    },
  ];

  return (
    <div className="w-full bg-white border-y border-slate-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-6 flex-1">
            {actions.map((action, i) => (
              <React.Fragment key={action.title}>
                <Link
                  href={action.href}
                  className="flex items-center gap-3 group hover:opacity-80 transition-opacity"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: action.bg }}
                  >
                    <action.icon className="w-4 h-4" style={{ color: action.color }} />
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-xs font-bold text-slate-900">{action.title}</div>
                    <div className="text-[10px] text-slate-500">{action.desc}</div>
                  </div>
                </Link>
                {i < actions.length - 1 && (
                  <div className="hidden md:flex items-center text-slate-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <Link
            href="/ask"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-md hover:shadow-lg transition-all group shrink-0"
            style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0d9488 100%)' }}
          >
            <span>Get Started Today</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Category Counts Helper ───────────────────────────────────────────────────
const CATEGORY_ICON_MAP: Record<string, React.ElementType> = {
  healthcare: Heart,
  education: GraduationCap,
  agriculture: Leaf,
  employment: Briefcase,
  housing: Home,
  business: BarChart3,
  disaster: Wind,
  identity_documents: FileText,
  financial_assistance: BarChart2,
  bereavement: Shield,
};

const CATEGORY_COLOR_MAP: Record<string, { bg: string; border: string; icon: string; text: string }> = {
  healthcare: { bg: '#fff1f1', border: '#fecaca', icon: '#dc2626', text: '#991b1b' },
  education: { bg: '#f5f3ff', border: '#ddd6fe', icon: '#7c3aed', text: '#5b21b6' },
  agriculture: { bg: '#f0fdf4', border: '#bbf7d0', icon: '#16a34a', text: '#15803d' },
  employment: { bg: '#eff6ff', border: '#bfdbfe', icon: '#2563eb', text: '#1d4ed8' },
  housing: { bg: '#f0fdfa', border: '#99f6e4', icon: '#0d9488', text: '#0f766e' },
  business: { bg: '#fffbeb', border: '#fde68a', icon: '#d97706', text: '#b45309' },
  disaster: { bg: '#f5f3ff', border: '#ddd6fe', icon: '#6d28d9', text: '#5b21b6' },
  identity_documents: { bg: '#f8fafc', border: '#e2e8f0', icon: '#475569', text: '#334155' },
  financial_assistance: { bg: '#eff6ff', border: '#bfdbfe', icon: '#0369a1', text: '#075985' },
  bereavement: { bg: '#fdf2f8', border: '#f9a8d4', icon: '#be185d', text: '#9d174d' },
};

// ─── Explore by Category Section ─────────────────────────────────────────────
function ExploreCategorySection() {
  const DISPLAY_CATEGORIES = DISCOVER_CATEGORIES.filter((c) => c.value !== 'ALL').slice(0, 8);

  const getCategoryCount = (categoryValue: string) => {
    return GOVERNMENT_SERVICES.filter(
      (s) =>
        (s.category === categoryValue || s.secondaryCategories?.includes(categoryValue as any)) &&
        s.status === 'ACTIVE'
    ).length;
  };

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div
              className="w-1 h-8 rounded-full"
              style={{ background: 'linear-gradient(to bottom, #2563eb, #0d9488)' }}
            />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Schemes by Category
            </h2>
          </div>
          <Link
            href="/discover"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
          >
            <span>View All Schemes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {DISPLAY_CATEGORIES.map((cat, i) => {
            const count = getCategoryCount(cat.value);
            const Icon = CATEGORY_ICON_MAP[cat.value] || FileText;
            const colors = CATEGORY_COLOR_MAP[cat.value] || CATEGORY_COLOR_MAP['identity_documents'];
            const shortLabel = cat.label.split(' & ')[0].split(' /')[0];

            return (
              <Link
                key={cat.value}
                href={`/discover?cat=${cat.value}`}
                className="group relative flex flex-col p-4 sm:p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  background: 'white',
                  borderColor: colors.border,
                  boxShadow: '0 2px 8px rgba(15,23,42,0.04)',
                }}
              >
                {/* Highlighted first card */}
                {i === 0 && (
                  <div
                    className="absolute top-0 right-0 px-2 py-1 rounded-bl-lg rounded-tr-2xl text-[10px] font-bold"
                    style={{ background: colors.bg, color: colors.text }}
                  >
                    Popular
                  </div>
                )}

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                  style={{ background: colors.bg }}
                >
                  <Icon className="w-5 h-5" style={{ color: colors.icon }} />
                </div>

                <h3 className="text-sm font-bold text-slate-900 mb-1 leading-tight">{shortLabel}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
                  {cat.label.includes('&') ? cat.label.split('&').map(p => p.trim()).join(' & ') : cat.label}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <span
                    className="text-xs font-bold"
                    style={{ color: colors.text }}
                  >
                    {count} Scheme{count !== 1 ? 's' : ''}
                  </span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    style={{ color: colors.icon }}
                  />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0d9488 100%)' }}
          >
            View All Schemes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works Section ─────────────────────────────────────────────────────
function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      icon: MessageSquare,
      title: 'Tell Us Your Situation',
      desc: 'Describe what you\'re facing in any Indian language — plain language, no jargon. JANSETU understands.',
      color: '#2563eb',
      bg: '#eff6ff',
    },
    {
      num: '02',
      icon: Compass,
      title: 'JANSETU Finds Relevant Help',
      desc: 'The platform checks hundreds of central and state schemes, verifying eligibility and jurisdiction for you.',
      color: '#0d9488',
      bg: '#f0fdfa',
    },
    {
      num: '03',
      icon: Map,
      title: 'Follow Your Action Plan',
      desc: 'Get a step-by-step roadmap with document requirements, application links, and official sources.',
      color: '#d97706',
      bg: '#fffbeb',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-4">
            <span>Simple. Transparent. Empowering.</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How JANSETU Works
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-lg mx-auto">
            From "I need help" to "Here's exactly what to do" — in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="relative flex flex-col p-6 rounded-2xl bg-white border border-slate-100 transition-all hover:shadow-lg hover:-translate-y-0.5"
              style={{ boxShadow: '0 2px 12px rgba(15,23,42,0.04)' }}
            >
              {/* Step connector */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center bg-white border border-slate-200"
                    style={{ boxShadow: '0 2px 6px rgba(15,23,42,0.08)' }}
                  >
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: step.bg }}
                >
                  <step.icon className="w-6 h-6" style={{ color: step.color }} />
                </div>
                <div
                  className="text-4xl font-black"
                  style={{ color: step.color, opacity: 0.15, lineHeight: 1 }}
                >
                  {step.num}
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/ask"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all group"
            style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0d9488 100%)' }}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Start with Your Situation</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Main Hero Export ─────────────────────────────────────────────────────────
export function Hero() {
  return (
    <>
      {/* ── HERO SECTION ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f4f8 30%, #f0fdf8 60%, #fdf8ff 100%)',
        }}
      >
        {/* Background blobs */}
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(219,234,254,0.6) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(209,250,229,0.5) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 sm:pt-14 sm:pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* ── Left: Text & Input ── */}
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  border: '1px solid rgba(226,232,240,0.8)',
                  boxShadow: '0 2px 8px rgba(15,23,42,0.06)',
                  color: '#334155',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-bold text-green-700">Government Schemes Made Simple</span>
              </div>

              {/* Headline */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-slate-900">
                  Many Schemes.{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #1d4ed8 0%, #0d9488 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    One Solution.
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed mt-4 max-w-lg">
                  Explain your situation. <strong className="text-slate-800">JANSETU</strong> finds the right government services, checks eligibility, and guides you through the next steps.
                </p>
              </div>

              {/* Search Input */}
              <HeroSearchInput />

              {/* Trust strip */}
              <TrustStrip />
            </div>

            {/* ── Right: Orbital Hub ── */}
            <div className="relative flex items-center justify-center">
              {/* Accessible label for the hub */}
              <div aria-label="JANSETU service categories hub" className="w-full">
                <OrbitalHub />
              </div>

              {/* Accessible government services quote */}
              <div
                className="absolute bottom-2 left-0 max-w-xs hidden lg:block"
                style={{ transform: 'translateX(-10%)' }}
              >
                <div
                  className="px-4 py-3 rounded-2xl text-xs text-white font-medium leading-relaxed"
                  style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
                    boxShadow: '0 8px 24px rgba(15,23,42,0.25)',
                  }}
                >
                  <span className="text-blue-300 font-bold">"</span>
                  Accessible Government Services for Every Citizen
                  <span className="text-blue-300 font-bold">"</span>
                  <div className="mt-1 w-8 h-0.5 rounded-full bg-blue-400/60" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Architectural Heritage Skyline Panorama (India Gate / Parliament / Bridge silhouette) */}
        <div className="w-full pointer-events-none overflow-hidden leading-none opacity-20 -mb-1">
          <svg
            viewBox="0 0 1440 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-12 sm:h-16 text-slate-400"
            preserveAspectRatio="none"
          >
            {/* Soft river / ground base */}
            <path
              d="M0 70H1440V58C1320 56 1200 62 1080 58C960 54 840 60 720 57C600 54 480 60 360 56C240 52 120 58 0 58V70Z"
              fill="currentColor"
              fillOpacity="0.4"
            />
            {/* Heritage Bridge arches */}
            <path
              d="M320 60C340 50 360 50 380 60C400 50 420 50 440 60C460 50 480 50 500 60C520 50 540 50 560 60V62H320V60Z"
              fill="currentColor"
              fillOpacity="0.6"
            />
            {/* Rashtrapati Bhavan / Parliament Dome */}
            <path
              d="M860 60V42C860 38 870 32 880 32C890 32 900 38 900 42V60H860Z"
              fill="currentColor"
              fillOpacity="0.7"
            />
            <path
              d="M879 32V25H881V32H879Z"
              fill="currentColor"
            />
            {/* India Gate arch silhouette */}
            <path
              d="M1260 60V30H1268V42C1272 38 1288 38 1292 42V30H1300V60H1288V46C1286 44 1274 44 1272 46V60H1260Z"
              fill="currentColor"
              fillOpacity="0.75"
            />
            {/* Ghats / Pavilion Temples silhouette */}
            <path
              d="M80 60V48L95 38L110 48V60H80Z"
              fill="currentColor"
              fillOpacity="0.5"
            />
          </svg>
        </div>
      </section>

      {/* ── QUICK ACTION STRIP ── */}
      <QuickActionStrip />

      {/* ── EXPLORE BY CATEGORY ── */}
      <ExploreCategorySection />

      {/* ── HOW IT WORKS ── */}
      <HowItWorksSection />
    </>
  );
}
