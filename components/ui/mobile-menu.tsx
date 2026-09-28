'use client';

import React from 'react';
import Link from 'next/link';
import { Globe, Bot } from 'lucide-react';
import { SupportedLanguage, LANGUAGE_OPTIONS } from '@/lib/i18n';

interface MobileMenuProps {
  currentPath: string;
  language: SupportedLanguage;
  onLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  navItems: { name: string; href: string }[];
  onClose: () => void;
  startCtaText: string;
}

export function MobileMenu({
  currentPath, language, onLanguageChange, navItems, onClose, startCtaText,
}: MobileMenuProps) {
  return (
    <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <Globe className="w-4 h-4 text-slate-500" />
          <span className="font-semibold">Language:</span>
        </div>
        <select value={language} onChange={onLanguageChange} className="p-1 bg-slate-50 border border-slate-200 rounded text-xs font-bold">
          {LANGUAGE_OPTIONS.map((opt) => (
            <option key={opt.code} value={opt.code}>{opt.nativeName} ({opt.label})</option>
          ))}
        </select>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const href = item.href;
          const isActive = href === '/' ? currentPath === '/' : currentPath.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${isActive ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-700 hover:bg-slate-50'}`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="pt-2">
        <Link
          href="/ask"
          onClick={onClose}
          className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-2.5 rounded-xl text-xs font-bold shadow"
        >
          <Bot className="w-4 h-4 text-amber-400" />
          <span>{startCtaText}</span>
        </Link>
      </div>
    </div>
  );
}
