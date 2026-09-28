'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { INDIA_STATES_AND_UTS } from '@/lib/indiaRegions';

export const DISCOVER_CATEGORIES = [
  { label: 'All Categories', value: 'ALL' },
  { label: 'Healthcare & Medical Assistance', value: 'healthcare' },
  { label: 'Financial Services & DBT', value: 'financial_assistance' },
  { label: 'Disaster & Emergency Relief', value: 'disaster' },
  { label: 'Housing & Property', value: 'housing' },
  { label: 'Education & Scholarships', value: 'education' },
  { label: 'Agriculture & Crop Loss', value: 'agriculture' },
  { label: 'Business & MSME Loans', value: 'business' },
  { label: 'Bereavement & Succession', value: 'bereavement' },
  { label: 'Employment & Skills', value: 'employment' },
  { label: 'Identity & Documents', value: 'identity_documents' },
];

interface DiscoverFiltersBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  selectedState: string;
  setSelectedState: (s: string) => void;
  selectedJurisdiction: 'ALL' | 'CENTRAL' | 'STATE';
  setSelectedJurisdiction: (j: 'ALL' | 'CENTRAL' | 'STATE') => void;
  sortBy: 'relevant' | 'confidence';
  setSortBy: (s: 'relevant' | 'confidence') => void;
}

export function DiscoverFiltersBar({
  searchQuery, setSearchQuery, selectedCategory, setSelectedCategory,
  selectedState, setSelectedState, selectedJurisdiction, setSelectedJurisdiction,
  sortBy, setSortBy,
}: DiscoverFiltersBarProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-civic-card space-y-4">
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by keywords: cyclone relief, scholarship, crop damage, MSME loan, bereavement, aadhaar..."
          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 focus:bg-white focus:border-indigo-600 focus:outline-none transition"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Category:</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-600">
            {DISCOVER_CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">State / Domicile:</label>
          <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-600">
            <option value="ALL">All India (National & All States)</option>
            {INDIA_STATES_AND_UTS.map((st) => <option key={st.code} value={st.name}>{st.name}</option>)}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Jurisdiction Level:</label>
          <select value={selectedJurisdiction} onChange={(e) => setSelectedJurisdiction(e.target.value as any)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-600">
            <option value="ALL">All Levels (Central & State)</option>
            <option value="CENTRAL">Central / National Schemes</option>
            <option value="STATE">State-Specific Schemes</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Sort By:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-600">
            <option value="relevant">Most Relevant</option>
            <option value="confidence">Eligibility Confidence</option>
          </select>
        </div>
      </div>
    </div>
  );
}
