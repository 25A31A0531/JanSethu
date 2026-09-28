'use client';

import React, { useState } from 'react';
import { UploadCloud, ExternalLink, ShieldCheck } from 'lucide-react';
import { DocumentRequirement, DocumentStatus } from '@/lib/types';
import { DocumentStatusBadge, DocumentOcrBadge } from './document-card-badges';

interface DocumentCardProps {
  document: DocumentRequirement;
  onUpdateStatus?: (docId: string, status: DocumentStatus) => void;
  onSimulateUpload?: (docId: string, detectedData: Record<string, any>) => void;
}

export function DocumentCard({ document, onUpdateStatus, onSimulateUpload }: DocumentCardProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [extractedData, setExtractedData] = useState<Record<string, any> | null>(document.extractedData || null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);

    setTimeout(() => {
      setIsUploading(false);
      const mock = {
        'Document Verified': `${document.name} (Authentic format)`,
        'Citizen Name Match': 'Verified ✓',
        'Issuing Authority': document.issuingAuthority,
        'Validity Period': document.validityPeriod || 'Active FY 2025-26',
        'Verification Mode': 'Client-Side Simulated OCR',
      };
      setExtractedData(mock);
      if (onSimulateUpload) onSimulateUpload(document.id, mock);
      if (onUpdateStatus) onUpdateStatus(document.id, 'ready');
    }, 1200);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-civic-card hover:shadow-civic-card-hover transition-all flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
            {document.category}
          </span>
          <DocumentStatusBadge status={document.status} />
        </div>

        <div>
          <h4 className="text-base font-bold text-slate-900 mb-1">{document.name}</h4>
          <p className="text-xs text-slate-600 leading-relaxed">{document.description}</p>
        </div>

        <div className="space-y-1.5 text-xs text-slate-500 pt-1">
          <div className="flex items-center justify-between border-t border-slate-100 pt-1.5">
            <span>Issuing Authority:</span>
            <span className="font-medium text-slate-700 text-right max-w-[180px] truncate">{document.issuingAuthority}</span>
          </div>
          {document.validityPeriod && (
            <div className="flex items-center justify-between">
              <span>Validity:</span>
              <span className="font-medium text-slate-700">{document.validityPeriod}</span>
            </div>
          )}
          {document.isDigiLockerAvailable && (
            <div className="flex items-center gap-1 text-[11px] text-indigo-700 font-medium bg-indigo-50/70 px-2 py-0.5 rounded">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Available via DigiLocker</span>
            </div>
          )}
        </div>

        {extractedData && <DocumentOcrBadge data={extractedData} />}
      </div>

      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition">
          <UploadCloud className="w-3.5 h-3.5" />
          <span>{isUploading ? 'Scanning OCR...' : 'Upload & Verify'}</span>
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileUpload} disabled={isUploading} className="hidden" />
        </label>

        {document.digitalAccessUrl && (
          <a href={document.digitalAccessUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 hover:underline">
            <span>Apply Online</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}
