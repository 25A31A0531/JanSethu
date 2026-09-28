'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck, Lock, Filter, CheckCircle2, AlertCircle, Clock, FileText } from 'lucide-react';
import { DocumentRequirement, DocumentStatus } from '@/lib/types';
import { getUserDocuments, updateUserDocument } from '@/lib/storage';
import { DocumentCard } from '@/components/ui/document-card';
import { useLanguage } from '@/components/LanguageProvider';
import { ReadinessGauge } from '@/components/ui/readiness-gauge';

const CATEGORIES = ['all', 'identity', 'income', 'residence', 'academic', 'land', 'legal', 'business'];

function StatCard({ icon: Icon, value, label, color }: { icon: React.ElementType; value: string | number; label: string; color: string }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(226,232,240,0.7)', boxShadow: '0 2px 8px rgba(15,23,42,0.04)' }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}12` }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <div className="text-xl font-extrabold text-slate-900 leading-none">{value}</div>
        <div className="text-xs text-slate-500 mt-0.5">{label}</div>
      </div>
    </div>
  );
}

export default function DocumentCenterPage() {
  const { t } = useLanguage();
  const [documents, setDocuments] = useState<DocumentRequirement[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => { setDocuments(getUserDocuments()); }, []);

  const handleUpdateStatus = (docId: string, status: DocumentStatus) => {
    const doc = documents.find((d) => d.id === docId);
    if (!doc) return;
    const allDocs = updateUserDocument({ ...doc, status });
    setDocuments([...allDocs]);
  };

  const handleSimulateUpload = (docId: string, extractedData: Record<string, any>) => {
    const doc = documents.find((d) => d.id === docId);
    if (!doc) return;
    const allDocs = updateUserDocument({ ...doc, status: 'ready', uploadedAt: new Date().toISOString(), extractedData });
    setDocuments([...allDocs]);
  };

  const readyCount = documents.filter((d) => d.status === 'ready').length;
  const missingCount = documents.filter((d) => d.status === 'missing').length;
  const totalCount = documents.length;
  const readinessPercent = totalCount > 0 ? Math.round((readyCount / totalCount) * 100) : 0;
  const filteredDocs = filterCategory === 'all' ? documents : documents.filter((d) => d.category === filterCategory);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #f0f7ff 0%, #f8fafc 50%, #f0fdf8 100%)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-3" style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(16,185,129,0.2)', color: '#065f46' }}>
              <ShieldCheck className="w-3.5 h-3.5" /><span>Encrypted Client-Side Readiness</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{t.documents.title}</h1>
            <p className="text-sm text-slate-500 mt-1">{t.documents.subtitle}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold" style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a5f)', color: 'white' }}>
            <Lock className="w-3.5 h-3.5 text-amber-400" /><span>Zero Cloud Storage</span>
          </span>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard icon={FileText} value={totalCount} label="Total Documents" color="#2563eb" />
          <StatCard icon={CheckCircle2} value={readyCount} label="Ready" color="#16a34a" />
          <StatCard icon={AlertCircle} value={missingCount} label="Missing" color="#dc2626" />
          <StatCard icon={Clock} value={`${readinessPercent}%`} label="Readiness" color="#d97706" />
        </div>

        {/* Readiness gauge */}
        <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(226,232,240,0.7)', boxShadow: '0 2px 10px rgba(15,23,42,0.05)' }}>
          <ReadinessGauge readyCount={readyCount} totalCount={totalCount} readinessPercent={readinessPercent} />
        </div>

        {/* Privacy note */}
        <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: 'rgba(239,246,255,0.8)', border: '1px solid rgba(147,197,253,0.5)' }}>
          <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-sm text-blue-900 block">Privacy &amp; Security Commitment</span>
            <p className="text-xs text-slate-600 leading-relaxed">{t.documents.simulatedOcrNotice}</p>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition ${
                filterCategory === cat ? 'text-white shadow-sm' : 'text-slate-700 hover:bg-slate-50'
              }`}
              style={filterCategory === cat ? { background: 'linear-gradient(135deg, #1d4ed8, #0d9488)' } : { background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(226,232,240,0.8)' }}
            >
              {cat === 'all' ? 'All Documents' : cat}
            </button>
          ))}
        </div>

        {/* Document cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="rounded-2xl overflow-hidden transition-all hover:-translate-y-0.5" style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(226,232,240,0.7)', boxShadow: '0 2px 8px rgba(15,23,42,0.05)' }}>
              <DocumentCard document={doc} onUpdateStatus={handleUpdateStatus} onSimulateUpload={handleSimulateUpload} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
