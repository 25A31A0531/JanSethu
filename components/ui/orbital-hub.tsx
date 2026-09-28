'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap, Heart, Leaf, Briefcase, Home, BarChart3,
  ShieldAlert, FileText, ArrowRight
} from 'lucide-react';

interface CategoryOrb {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  iconColor: string;
  bgGradient: string;
  borderColor: string;
  glowColor: string;
  description: string;
  href: string;
  angle: number;
}

const CATEGORY_ORBS: CategoryOrb[] = [
  {
    id: 'education',
    label: 'Education',
    icon: GraduationCap,
    color: '#3b82f6',
    iconColor: '#2563eb',
    bgGradient: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #eff6ff 50%, #dbeafe 100%)',
    borderColor: '#60a5fa',
    glowColor: 'rgba(59, 130, 246, 0.45)',
    description: 'Scholarships, fee waivers & loans',
    href: '/discover?cat=education',
    angle: 270, // Top
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    icon: Heart,
    color: '#f43f5e',
    iconColor: '#e11d48',
    bgGradient: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #fff1f2 50%, #ffe4e6 100%)',
    borderColor: '#fb7185',
    glowColor: 'rgba(244, 63, 94, 0.45)',
    description: 'Cashless treatment & health insurance',
    href: '/discover?cat=healthcare',
    angle: 315, // Top-Right
  },
  {
    id: 'agriculture',
    label: 'Agriculture',
    icon: Leaf,
    color: '#10b981',
    iconColor: '#059669',
    bgGradient: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #ecfdf5 50%, #d1fae5 100%)',
    borderColor: '#34d399',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    description: 'Crop relief, PM-KISAN & input subsidies',
    href: '/discover?cat=agriculture',
    angle: 0, // Right
  },
  {
    id: 'housing',
    label: 'Housing',
    icon: Home,
    color: '#a855f7',
    iconColor: '#9333ea',
    bgGradient: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #faf5ff 50%, #f3e8ff 100%)',
    borderColor: '#c084fc',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    description: 'PMAY housing & reconstruction relief',
    href: '/discover?cat=housing',
    angle: 45, // Bottom-Right
  },
  {
    id: 'employment',
    label: 'Employment',
    icon: Briefcase,
    color: '#0284c7',
    iconColor: '#0369a1',
    bgGradient: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%)',
    borderColor: '#38bdf8',
    glowColor: 'rgba(2, 132, 199, 0.45)',
    description: 'Skill programs, stipends & rural jobs',
    href: '/discover?cat=employment',
    angle: 90, // Bottom
  },
  {
    id: 'business',
    label: 'Business',
    icon: BarChart3,
    color: '#f59e0b',
    iconColor: '#d97706',
    bgGradient: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #fffbeb 50%, #fef3c7 100%)',
    borderColor: '#fbbf24',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    description: 'MUDRA & PMEGP collateral-free loans',
    href: '/discover?cat=business',
    angle: 135, // Bottom-Left
  },
  {
    id: 'disaster',
    label: 'Disaster Relief',
    icon: ShieldAlert,
    color: '#ef4444',
    iconColor: '#dc2626',
    bgGradient: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #fef2f2 50%, #fee2e2 100%)',
    borderColor: '#f87171',
    glowColor: 'rgba(239, 68, 68, 0.45)',
    description: 'SDRF flood, cyclone & emergency aid',
    href: '/discover?cat=disaster',
    angle: 180, // Left
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: FileText,
    color: '#8b5cf6',
    iconColor: '#7c3aed',
    bgGradient: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #f5f3ff 50%, #ede9fe 100%)',
    borderColor: '#a78bfa',
    glowColor: 'rgba(139, 92, 246, 0.45)',
    description: 'Aadhaar, certificates & DigiLocker',
    href: '/documents',
    angle: 225, // Top-Left
  },
];

// Helper: convert angle (degrees) and radius (%) to Cartesian coords
function getCoordinates(angleDeg: number, radiusPct: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: 50 + radiusPct * Math.cos(rad),
    y: 50 + radiusPct * Math.sin(rad),
  };
}

export function OrbitalHub() {
  const [hoveredOrb, setHoveredOrb] = useState<string | null>(null);

  // Radius for 8 orbital nodes (% of square container)
  const NODE_RADIUS = 40;

  return (
    <div
      className="relative w-full max-w-[620px] mx-auto select-none"
      style={{ aspectRatio: '1 / 1' }}
      aria-label="JANSETU Interactive Government Service Ecosystem"
    >
      {/* ── Background Deep Atmospheric Glow ── */}
      <div
        className="absolute inset-2 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.28) 0%, rgba(37, 99, 235, 0.14) 40%, rgba(13, 148, 136, 0.06) 65%, transparent 80%)',
          filter: 'blur(30px)',
        }}
      />

      {/* ── SVG Connecting Lines & Orbital Tracks ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox="0 0 100 100"
      >
        <defs>
          {/* Radial Glow Filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Linear gradient for orbital tracks */}
          <linearGradient id="orbitalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.45" />
          </linearGradient>

          {/* Active Connector Gradient */}
          <linearGradient id="activeBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* 3D Tilted Orbital Ellipses */}
        <ellipse
          cx="50"
          cy="50"
          rx="43"
          ry="37"
          fill="none"
          stroke="url(#orbitalGrad)"
          strokeWidth="0.5"
          strokeDasharray="1.5 2"
          className="animate-spin-slow"
          style={{ transformOrigin: '50% 50%' }}
        />

        <ellipse
          cx="50"
          cy="50"
          rx="45"
          ry="39"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="0.3"
          strokeOpacity="0.35"
        />

        {/* Inner concentric guidance ring */}
        <circle
          cx="50"
          cy="50"
          r="26"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="0.4"
          strokeDasharray="2 3"
          strokeOpacity="0.5"
        />

        {/* Luminous Connector Rays from Center (50,50) to each category node */}
        {CATEGORY_ORBS.map((orb) => {
          const pt = getCoordinates(orb.angle, NODE_RADIUS);
          const isHovered = hoveredOrb === orb.id;

          return (
            <g key={`ray-${orb.id}`}>
              {/* Soft background glow line */}
              <line
                x1="50"
                y1="50"
                x2={pt.x}
                y2={pt.y}
                stroke={isHovered ? orb.color : '#93c5fd'}
                strokeWidth={isHovered ? '1.4' : '0.5'}
                strokeOpacity={isHovered ? '0.85' : '0.25'}
                strokeDasharray={isHovered ? 'none' : '1.5 1.5'}
                filter={isHovered ? 'url(#glow)' : undefined}
                className="transition-all duration-300"
              />

              {/* Pulsing light particle on connector line */}
              {isHovered && (
                <circle
                  cx={50 + (pt.x - 50) * 0.55}
                  cy={50 + (pt.y - 50) * 0.55}
                  r="1.2"
                  fill="#ffffff"
                  filter="url(#glow)"
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* ── CENTRAL JANSETU GLOBE ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Outer Atmospheric Halo */}
        <div
          className="absolute rounded-full animate-pulse-ring"
          style={{
            width: 250,
            height: 250,
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(37, 99, 235, 0.08) 60%, transparent 80%)',
          }}
        />

        {/* Photorealistic Globe Body */}
        <div
          className="relative rounded-full flex items-center justify-center overflow-hidden shadow-2xl transition-transform duration-500"
          style={{
            width: 210,
            height: 210,
            background: 'radial-gradient(circle at 45% 40%, #0369a1 0%, #075985 25%, #0c4a6e 55%, #082f49 85%, #021a2e 100%)',
            boxShadow: '0 0 50px 10px rgba(56, 189, 248, 0.4), inset 0 0 35px 8px rgba(125, 211, 252, 0.4), inset 0 2px 4px rgba(255,255,255,0.7)',
            border: '2px solid rgba(125, 211, 252, 0.6)',
          }}
        >
          {/* Subtle stylized Earth continents overlay */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 45%, rgba(52, 211, 153, 0.55) 0%, rgba(16, 185, 129, 0.35) 30%, transparent 60%)',
            }}
          />

          {/* Illuminated India/Asia landmass glow */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              top: '28%',
              right: '28%',
              width: '45%',
              height: '45%',
              background: 'radial-gradient(circle, rgba(254, 240, 138, 0.3) 0%, rgba(56, 189, 248, 0.3) 40%, transparent 75%)',
              filter: 'blur(4px)',
            }}
          />

          {/* Latitude / Longitude lines */}
          <svg
            className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
            viewBox="0 0 210 210"
            fill="none"
          >
            <ellipse cx="105" cy="105" rx="100" ry="100" stroke="#bae6fd" strokeWidth="0.7" />
            <ellipse cx="105" cy="105" rx="72" ry="100" stroke="#bae6fd" strokeWidth="0.5" />
            <ellipse cx="105" cy="105" rx="36" ry="100" stroke="#bae6fd" strokeWidth="0.5" />
            <line x1="5" y1="105" x2="205" y2="105" stroke="#bae6fd" strokeWidth="0.7" />
            <ellipse cx="105" cy="105" rx="100" ry="42" stroke="#bae6fd" strokeWidth="0.5" />
            <ellipse cx="105" cy="105" rx="100" ry="72" stroke="#bae6fd" strokeWidth="0.5" />
          </svg>

          {/* Central JANSETU Core Badge */}
          <div
            className="relative z-10 flex flex-col items-center justify-center rounded-full text-center px-4"
            style={{
              width: 145,
              height: 145,
              background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.94) 0%, rgba(10, 37, 64, 0.94) 100%)',
              border: '2px solid rgba(56, 189, 248, 0.75)',
              boxShadow: '0 0 25px rgba(56, 189, 248, 0.5), inset 0 0 15px rgba(56, 189, 248, 0.35)',
            }}
          >
            {/* JANSETU Bridge / Gateway Icon */}
            <div className="mb-1 text-cyan-300">
              <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                {/* Bridge arch */}
                <path
                  d="M2 17C6 8 22 8 26 17"
                  stroke="url(#bridgeGrad)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                {/* Support pillars */}
                <line x1="8" y1="12" x2="8" y2="17" stroke="#38bdf8" strokeWidth="1.4" />
                <line x1="14" y1="9.5" x2="14" y2="17" stroke="#38bdf8" strokeWidth="1.4" />
                <line x1="20" y1="12" x2="20" y2="17" stroke="#38bdf8" strokeWidth="1.4" />
                {/* Central shining star */}
                <circle cx="14" cy="5" r="2" fill="#fef08a" />
                <defs>
                  <linearGradient id="bridgeGrad" x1="2" y1="17" x2="26" y2="17">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#67e8f9" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="text-white font-black text-[16px] tracking-[0.14em] leading-none drop-shadow-sm">
              JANSETU
            </div>
            <div className="text-cyan-300 font-bold text-[7.5px] tracking-[0.18em] uppercase mt-1 leading-tight">
              CITIZEN SERVICES
            </div>
            <div className="text-slate-300 font-semibold text-[6.5px] tracking-[0.2em] uppercase leading-tight">
              NAVIGATOR
            </div>
          </div>
        </div>
      </div>

      {/* ── 8 ORBITAL CATEGORY NODES ── */}
      {CATEGORY_ORBS.map((orb) => {
        const pt = getCoordinates(orb.angle, NODE_RADIUS);
        const isHovered = hoveredOrb === orb.id;
        const Icon = orb.icon;

        return (
          <Link
            key={orb.id}
            href={orb.href}
            onMouseEnter={() => setHoveredOrb(orb.id)}
            onMouseLeave={() => setHoveredOrb(null)}
            className="group absolute flex flex-col items-center cursor-pointer transition-all duration-300"
            style={{
              left: `${pt.x}%`,
              top: `${pt.y}%`,
              transform: `translate(-50%, -50%) scale(${isHovered ? 1.15 : 1})`,
              zIndex: isHovered ? 30 : 15,
            }}
            aria-label={`Explore ${orb.label} government schemes`}
          >
            {/* Circular Icon Orb with Glass Elevation */}
            <div
              className="relative flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                width: 60,
                height: 60,
                background: orb.bgGradient,
                border: `2px solid ${isHovered ? orb.color : orb.borderColor}`,
                boxShadow: isHovered
                  ? `0 0 25px 5px ${orb.glowColor}, 0 10px 20px rgba(15, 23, 42, 0.15)`
                  : `0 4px 14px rgba(15, 23, 42, 0.08), 0 0 12px ${orb.glowColor}`,
              }}
            >
              <Icon
                style={{
                  width: 26,
                  height: 26,
                  color: isHovered ? orb.color : orb.iconColor,
                  strokeWidth: 2.2,
                }}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              {/* Glowing ring overlay on hover */}
              {isHovered && (
                <div
                  className="absolute inset-0 rounded-full animate-ping pointer-events-none"
                  style={{
                    border: `1.5px solid ${orb.color}`,
                    opacity: 0.35,
                  }}
                />
              )}
            </div>

            {/* Pill Label */}
            <div
              className="mt-1.5 px-2.5 py-1 rounded-full text-center transition-all duration-300"
              style={{
                background: isHovered ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: `1px solid ${isHovered ? orb.color : 'rgba(226, 232, 240, 0.9)'}`,
                boxShadow: isHovered
                  ? `0 4px 12px ${orb.glowColor}`
                  : '0 2px 6px rgba(15, 23, 42, 0.06)',
              }}
            >
              <span
                className="text-[11px] font-bold block whitespace-nowrap leading-none"
                style={{ color: isHovered ? orb.color : '#0f172a' }}
              >
                {orb.label}
              </span>
            </div>
          </Link>
        );
      })}

      {/* ── Top-Right Flag & Motto Badge ── */}
      <div
        className="absolute top-2 right-0 hidden lg:flex flex-col items-end pointer-events-none"
        style={{ transform: 'translateX(8%)' }}
      >
        <div
          className="flex items-center gap-3.5 px-4 py-3 rounded-2xl shadow-md border"
          style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(10px)',
            borderColor: 'rgba(226, 232, 240, 0.9)',
            boxShadow: '0 4px 20px rgba(15, 23, 42, 0.06)',
          }}
        >
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              A STRONGER
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-black text-amber-600">India</span>
              <span className="text-sm font-black text-blue-600">Together</span>
            </div>
            <p className="text-[9.5px] font-medium text-slate-500 leading-tight">
              Inclusive • Prosperous • Equitable
            </p>
          </div>

          {/* Indian Tricolor Flag SVG with Ashoka Chakra */}
          <div
            className="flex flex-col rounded overflow-hidden shadow-xs shrink-0"
            style={{ width: 28, height: 20, border: '1px solid rgba(0,0,0,0.08)' }}
          >
            <div className="flex-1" style={{ background: '#ff9933' }} />
            <div className="flex-1 bg-white flex items-center justify-center">
              <div
                className="rounded-full border border-blue-800"
                style={{ width: 5, height: 5 }}
              />
            </div>
            <div className="flex-1" style={{ background: '#138808' }} />
          </div>
        </div>
      </div>

      {/* ── Active Node Tooltip (when hovered) ── */}
      {hoveredOrb && (() => {
        const active = CATEGORY_ORBS.find((o) => o.id === hoveredOrb);
        if (!active) return null;

        return (
          <div
            className="absolute left-1/2 bottom-0 -translate-x-1/2 z-40 pointer-events-none animate-fade-in"
          >
            <div
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl shadow-lg border"
              style={{
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(12px)',
                borderColor: active.borderColor,
                boxShadow: `0 4px 20px ${active.glowColor}`,
              }}
            >
              <div
                className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: active.glowColor }}
              >
                <active.icon style={{ width: 12, height: 12, color: active.color }} />
              </div>
              <span className="text-xs font-bold" style={{ color: active.color }}>
                {active.label}:
              </span>
              <span className="text-xs text-slate-600 font-medium">
                {active.description}
              </span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
            </div>
          </div>
        );
      })()}
    </div>
  );
}
