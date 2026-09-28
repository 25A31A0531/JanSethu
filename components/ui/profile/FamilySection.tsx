'use client';

import React from 'react';
import { Users, Plus, Trash2 } from 'lucide-react';
import { FamilyMember, FamilyRelationship } from '@/lib/types';
import { useLanguage } from '@/components/LanguageProvider';

interface FamilySectionProps {
  family: FamilyMember[];
  showAddMember: boolean;
  newRel: FamilyRelationship;
  newName: string;
  newAge: number;
  newOcc: string;
  onToggleAdd: () => void;
  onRelChange: (v: FamilyRelationship) => void;
  onNameChange: (v: string) => void;
  onAgeChange: (v: number) => void;
  onOccChange: (v: string) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
}

export function FamilySection({
  family, showAddMember, newRel, newName, newAge, newOcc,
  onToggleAdd, onRelChange, onNameChange, onAgeChange, onOccChange, onAdd, onDelete,
}: FamilySectionProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-civic-card space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" />
          <div>
            <h3 className="font-bold text-base text-slate-900">{t.profile.familySection}</h3>
            <p className="text-xs text-slate-500">Allows you to ask questions and find schemes on behalf of relatives.</p>
          </div>
        </div>
        <button type="button" onClick={onToggleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-200 transition">
          <Plus className="w-3.5 h-3.5" /><span>{t.profile.addMember}</span>
        </button>
      </div>

      {showAddMember && (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 text-xs">
          <h4 className="font-bold text-slate-900">Add Relative Profile:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Relationship</label>
              <select value={newRel} onChange={(e) => onRelChange(e.target.value as FamilyRelationship)}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg">
                {['Father','Mother','Daughter','Son','Spouse','Brother','Sister','Grandparent'].map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Name (Optional)</label>
              <input type="text" value={newName} onChange={(e) => onNameChange(e.target.value)}
                placeholder="E.g., Ramesh" className="w-full p-2 bg-white border border-slate-300 rounded-lg" />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Occupation</label>
              <input type="text" value={newOcc} onChange={(e) => onOccChange(e.target.value)}
                placeholder="E.g., Farmer / Retired" className="w-full p-2 bg-white border border-slate-300 rounded-lg" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onToggleAdd} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-600">Cancel</button>
            <button type="button" onClick={onAdd} className="px-4 py-1.5 bg-slate-900 text-white rounded-lg font-bold">Save Member</button>
          </div>
        </div>
      )}

      {family.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {family.map((m) => (
            <div key={m.id} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
              <div>
                <strong className="text-slate-900 text-sm block">{m.relationship}</strong>
                <span className="text-slate-500">{m.name} • {m.occupation || 'Dependent'}</span>
              </div>
              <button type="button" onClick={() => onDelete(m.id)} className="p-1 text-slate-400 hover:text-rose-600 transition" title="Delete member">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-slate-400 italic">No family members registered yet.</p>
      )}
    </div>
  );
}
