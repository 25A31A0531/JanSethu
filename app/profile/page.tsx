'use client';

import React, { useState, useEffect } from 'react';
import { User, Lock, Check, ToggleLeft, ToggleRight, Save, MapPin, Users } from 'lucide-react';
import { CitizenProfile, FamilyMember, FamilyRelationship } from '@/lib/types';
import { getCitizenProfile, saveCitizenProfile, getFamilyMembers, saveFamilyMembers, getDebugMode, setDebugMode } from '@/lib/storage';
import { useLanguage } from '@/components/LanguageProvider';
import { LocationSection } from '@/components/ui/profile/LocationSection';
import { DemographicsSection } from '@/components/ui/profile/DemographicsSection';
import { FamilySection } from '@/components/ui/profile/FamilySection';

function SectionCard({ title, icon: Icon, iconColor, children }: {
  title: string; icon: React.ElementType; iconColor: string; children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(226,232,240,0.7)', boxShadow: '0 2px 10px rgba(15,23,42,0.05)' }}>
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100" style={{ background: 'rgba(248,250,252,0.8)' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${iconColor}18` }}>
          <Icon className="w-4 h-4" style={{ color: iconColor }} />
        </div>
        <h2 className="text-sm font-bold text-slate-900">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

export default function ProfilePage() {
  const { t } = useLanguage();
  const [profile, setProfile] = useState<CitizenProfile>(getCitizenProfile());
  const [family, setFamily] = useState<FamilyMember[]>([]);
  const [debugMode, setDebugModeState] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newRel, setNewRel] = useState<FamilyRelationship>('Father');
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState<number>(50);
  const [newOcc, setNewOcc] = useState('');

  useEffect(() => { setProfile(getCitizenProfile()); setFamily(getFamilyMembers()); setDebugModeState(getDebugMode()); }, []);

  const handleProfileChange = (field: keyof CitizenProfile, val: any) => setProfile((prev) => ({ ...prev, [field]: val }));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault(); saveCitizenProfile(profile); setSaveSuccess(true); setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleAddFamilyMember = () => {
    const updated = [...family, { id: `fam-${Date.now()}`, relationship: newRel, name: newName || newRel, age: newAge, occupation: newOcc, residenceState: profile.residenceState }];
    setFamily(updated); saveFamilyMembers(updated); setShowAddMember(false); setNewName(''); setNewOcc('');
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #f0f7ff 0%, #f8fafc 50%, #f0fdf8 100%)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold mb-3" style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(37,99,235,0.15)', color: '#1d4ed8' }}>
              <User className="w-3.5 h-3.5" /><span>Client-Side Citizen Data</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{t.profile.title}</h1>
            <p className="text-sm text-slate-500 mt-1">{t.profile.subtitle}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#065f46' }}>
            <Lock className="w-3.5 h-3.5" /><span>{t.profile.privacyNote}</span>
          </span>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-5">
          <SectionCard title="Location &amp; Jurisdiction" icon={MapPin} iconColor="#2563eb">
            <LocationSection profile={profile} onChange={handleProfileChange} />
          </SectionCard>
          <SectionCard title="Demographics &amp; Eligibility" icon={User} iconColor="#7c3aed">
            <DemographicsSection profile={profile} onChange={handleProfileChange} />
          </SectionCard>
          <SectionCard title="Family &amp; Dependents" icon={Users} iconColor="#0d9488">
            <FamilySection
              family={family} showAddMember={showAddMember} newRel={newRel} newName={newName} newAge={newAge} newOcc={newOcc}
              onToggleAdd={() => setShowAddMember(!showAddMember)} onRelChange={setNewRel}
              onNameChange={setNewName} onAgeChange={setNewAge} onOccChange={setNewOcc}
              onAdd={handleAddFamilyMember}
              onDelete={(id) => { const u = family.filter((m) => m.id !== id); setFamily(u); saveFamilyMembers(u); }}
            />
          </SectionCard>

          <div className="flex items-center justify-between p-5 rounded-2xl" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="space-y-0.5">
              <h4 className="font-bold text-sm text-white">{t.profile.debugToggle}</h4>
              <p className="text-xs text-slate-400">Reveals the &ldquo;Why was this not shown?&rdquo; engine inspector.</p>
            </div>
            <button type="button" onClick={() => { const n = !debugMode; setDebugModeState(n); setDebugMode(n); setProfile((p) => ({ ...p, debugMode: n })); }} className="p-2 rounded-xl transition" aria-pressed={debugMode} aria-label="Toggle debug mode">
              {debugMode ? <ToggleRight className="w-9 h-9 text-emerald-400" /> : <ToggleLeft className="w-9 h-9 text-slate-500" />}
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            {saveSuccess && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#065f46' }}>
                <Check className="w-4 h-4" />Profile saved locally!
              </span>
            )}
            <div className="ml-auto">
              <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-md hover:shadow-lg transition-all" style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #0d9488 100%)' }}>
                <Save className="w-4 h-4" /><span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
