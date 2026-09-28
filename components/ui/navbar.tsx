'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, Sparkles, ChevronDown, Search, FileText, User, BookOpen, Compass, Map, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { SupportedLanguage, LANGUAGE_OPTIONS } from '@/lib/i18n';
import { DemoScenarios } from './demo-scenarios';

// JANSETU Logo SVG
function JansetuLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#0f172a" />
      <circle cx="20" cy="20" r="12" stroke="#3b82f6" strokeWidth="1.5" fill="none" opacity="0.5" />
      <circle cx="20" cy="20" r="7" stroke="#0d9488" strokeWidth="1.5" fill="none" opacity="0.6" />
      <circle cx="20" cy="20" r="3" fill="#f97316" />
      {/* People figure */}
      <path d="M13 27c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="#f8fafc" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="20" cy="17" r="2.5" fill="#f8fafc" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: 'Home', href: '/', icon: null },
  { label: 'Discover Schemes', href: '/discover', icon: Compass },
  { label: 'Ask JANSETU', href: '/ask', icon: MessageSquare },
  { label: 'My Journey', href: '/journey', icon: Map },
  { label: 'My Profile', href: '/profile', icon: User },
  { label: 'Documents', href: '/documents', icon: FileText },
  { label: 'Learn', href: '/learn', icon: BookOpen },
];

export function Navbar() {
  const currentPath = usePathname() ?? '/';
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = NAV_LINKS.map((link) => ({ ...link, name: link.label }));

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
            : 'bg-white/90 backdrop-blur-sm border-b border-slate-100'
        }`}
      >
        {/* Tricolor top stripe */}
        <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #f97316 33.3%, #ffffff 33.3%, #ffffff 66.6%, #16a34a 66.6%)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="JANSETU Home">
              <JansetuLogo size={36} />
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-none">JANSETU</span>
                  <span className="hidden sm:inline text-[10px] font-bold tracking-widest text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-100">V1.0</span>
                </div>
                <p className="text-[10px] text-slate-500 hidden sm:block leading-none mt-0.5 font-medium">Citizen Service Navigator</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-0.5" aria-label="Main navigation">
              {navItems.map((item) => {
                const isActive = item.href === '/' ? currentPath === '/' : currentPath.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-3 py-2 rounded-lg text-[13px] font-semibold transition-all ${
                      isActive
                        ? 'text-blue-700 bg-blue-50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-blue-600" />
                    )}
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Language Selector */}
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-600 hover:bg-white transition">
                <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                  className="bg-transparent font-semibold focus:outline-none cursor-pointer text-xs max-w-[90px] truncate"
                  aria-label="Select Language"
                >
                  {LANGUAGE_OPTIONS.map((opt) => (
                    <option key={opt.code} value={opt.code}>{opt.nativeName}</option>
                  ))}
                </select>
              </div>

              {/* Demo Button */}
              <button
                onClick={() => setDemoModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Try Demo</span>
              </button>

              {/* Ask CTA */}
              <Link
                href="/ask"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white shadow-sm hover:shadow-md transition-all"
                style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0d9488 100%)' }}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Ask JANSETU</span>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setDemoModalOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200"
              >
                <Sparkles className="w-3 h-3" />
                <span className="hidden sm:inline">Demo</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition"
                aria-label="Toggle Menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navItems.map((item) => {
                const isActive = item.href === '/' ? currentPath === '/' : currentPath.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                      isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                  className="flex-1 text-sm font-medium text-slate-700 bg-transparent focus:outline-none"
                  aria-label="Select Language"
                >
                  {LANGUAGE_OPTIONS.map((opt) => (
                    <option key={opt.code} value={opt.code}>{opt.nativeName} ({opt.label})</option>
                  ))}
                </select>
              </div>
              <Link
                href="/ask"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white mt-2"
                style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0d9488 100%)' }}
              >
                <MessageSquare className="w-4 h-4" />
                Ask JANSETU
              </Link>
            </div>
          </div>
        )}
      </header>

      <DemoScenarios isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} variant="modal" />
    </>
  );
}
