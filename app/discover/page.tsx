'use client';

import React, { useState, useMemo } from 'react';
import { Compass, Search, SlidersHorizontal, X } from 'lucide-react';
import { CitizenProfile } from '@/lib/types';
import { getCitizenProfile } from '@/lib/storage';
import { ServiceCard } from '@/components/ui/service-card';
import { DiscoverFiltersBar } from '@/components/ui/discover-filters-bar';
import { filterAndRankServices } from '@/lib/discoverServices';

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<'ALL' | 'CENTRAL' | 'STATE'>('ALL');
  const [sortBy, setSortBy] = useState<'relevant' | 'confidence'>('relevant');
  const [filtersOpen, setFiltersOpen] = useState(true);

  const userProfile = useMemo(() => getCitizenProfile(), []);

  const defaultProfile: CitizenProfile = useMemo(() => {
    if (selectedState === 'ALL') return userProfile;
    return {
      ...userProfile,
      residenceState: selectedState,
      studyState: selectedState,
      employmentState: selectedState,
      propertyState: selectedState,
      agricultureState: selectedState,
      businessState: selectedState,
    };
  }, [selectedState, userProfile]);

  const filteredRecommendations = useMemo(() => {
    return filterAndRankServices(
      searchQuery, selectedCategory, selectedJurisdiction, selectedState, sortBy, defaultProfile
    );
  }, [searchQuery, selectedState, selectedCategory, selectedJurisdiction, sortBy]);

  const hasActiveFilters = searchQuery || selectedCategory !== 'ALL' || selectedState !== 'ALL' || selectedJurisdiction !== 'ALL';

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedState('ALL');
    setSelectedJurisdiction('ALL');
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg, #f0f7ff 0%, #f8fafc 50%, #f0fdf8 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-3"
              style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(37,99,235,0.15)', color: '#1d4ed8' }}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>National &amp; State Scheme Repository</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Discover Government Services</h1>
            <p className="text-sm text-slate-500 mt-1">Search verified central and state schemes with jurisdiction filters and official source links.</p>
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button onClick={handleReset} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 bg-red-50 border border-red-100 hover:bg-red-100 transition">
                <X className="w-3.5 h-3.5" />Clear Filters
              </button>
            )}
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold" style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0d9488 100%)', color: 'white' }}>
              <Search className="w-4 h-4" />
              <span>{filteredRecommendations.length} Services</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(226,232,240,0.8)', boxShadow: '0 4px 20px rgba(15,23,42,0.06)' }}>
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 cursor-pointer" onClick={() => setFiltersOpen(!filtersOpen)}>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-slate-900">Search &amp; Filter</span>
              {hasActiveFilters && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white">Active</span>}
            </div>
            <span className="text-xs text-slate-500">{filtersOpen ? 'Collapse' : 'Expand'}</span>
          </div>
          {filtersOpen && (
            <div className="p-5">
              <DiscoverFiltersBar
                searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                selectedState={selectedState} setSelectedState={setSelectedState}
                selectedJurisdiction={selectedJurisdiction} setSelectedJurisdiction={setSelectedJurisdiction}
                sortBy={sortBy} setSortBy={setSortBy}
              />
            </div>
          )}
        </div>

        <div className="space-y-5">
          {filteredRecommendations.length > 0 ? (
            filteredRecommendations.map((rec) => (
              <div key={rec.serviceId} className="rounded-2xl transition-all hover:-translate-y-0.5" style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(226,232,240,0.7)', boxShadow: '0 2px 10px rgba(15,23,42,0.05)' }}>
                <ServiceCard recommendation={rec} profile={defaultProfile} />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(226,232,240,0.7)' }}>
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4"><Search className="w-8 h-8 text-slate-400" /></div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">No Services Found</h3>
              <p className="text-sm text-slate-500 max-w-sm mb-6">Try adjusting your search terms, changing the category, or switching state domicile to &apos;All India&apos;.</p>
              <button onClick={handleReset} className="px-5 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0d9488 100%)' }}>Reset All Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
