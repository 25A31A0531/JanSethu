'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, FileCheck, Lock, ExternalLink, Globe2, MessageSquare, Compass, Map, User, BookOpen, FileText, Heart, ArrowRight } from 'lucide-react';

function JansetuLogoFooter() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0d9488 100%)' }}>
        <span className="text-white font-extrabold text-sm">JS</span>
      </div>
      <div>
        <div className="font-extrabold text-lg text-white tracking-tight leading-none">JANSETU</div>
        <div className="text-[10px] text-slate-400 mt-0.5">Citizen Service Navigator</div>
      </div>
    </div>
  );
}

const NAV_SECTIONS = [
  {
    title: 'Navigate',
    links: [
      { label: 'Ask JANSETU', href: '/ask', icon: MessageSquare, highlight: true },
      { label: 'Discover Schemes', href: '/discover', icon: Compass },
      { label: 'My Journey', href: '/journey', icon: Map },
      { label: 'My Profile', href: '/profile', icon: User },
      { label: 'Documents', href: '/documents', icon: FileText },
      { label: 'Learn', href: '/learn', icon: BookOpen },
    ],
  },
  {
    title: 'Our Principles',
    items: [
      { icon: Shield, text: 'Transparent rule-based matching — no opaque black boxes.' },
      { icon: FileCheck, text: 'Zero permanent document cloud storage in prototype.' },
      { icon: Globe2, text: '13 Indian languages supported natively.' },
      { icon: Lock, text: 'All profile data stays on your device.' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 mt-20">
      {/* Tricolor top accent */}
      <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #f97316 33.3%, #e2e8f0 33.3%, #e2e8f0 66.6%, #16a34a 66.6%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-5">
            <JansetuLogoFooter />
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              AI-powered citizen government-service navigator for India. Converting everyday life events into personalized, dependency-aware action plans.
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-1.5 rounded-lg">
                <Lock className="w-3 h-3" /> Client-Side Privacy First
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-400 bg-blue-950/60 border border-blue-800/50 px-2.5 py-1.5 rounded-lg">
                <Globe2 className="w-3 h-3" /> 13 Languages
              </span>
            </div>

            {/* CTA */}
            <Link
              href="/ask"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white shadow-md hover:shadow-lg transition-all group"
              style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0d9488 100%)' }}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask JANSETU</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Navigate Column */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">Navigate</h4>
            <ul className="space-y-2.5">
              {NAV_SECTIONS[0].links?.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-2 text-sm hover:text-white transition-colors ${
                      link.highlight ? 'text-blue-400 font-semibold' : ''
                    }`}
                  >
                    <link.icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Principles Column */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-4">Our Principles</h4>
            <ul className="space-y-3">
              {NAV_SECTIONS[1].items?.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <item.icon className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-400 leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer Column */}
          <div className="md:col-span-2">
            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-400">Prototype Notice</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                JANSETU is an independent prototype, not an official Government of India service. Always verify on official ministry portals.
              </p>
              <a
                href="https://india.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 transition"
              >
                <span>National Portal of India</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} JANSETU Prototype</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Built with <Heart className="w-3 h-3 text-red-400" /> for India
            </span>
          </p>
          <div className="flex items-center gap-4">
            <Link href="/learn" className="hover:text-slate-300 transition">Privacy & Data Ethics</Link>
            <span>•</span>
            <Link href="/learn" className="hover:text-slate-300 transition">How Schemes Work</Link>
            <span>•</span>
            <a
              href="https://data.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-slate-300 transition"
            >
              <span>data.gov.in</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
