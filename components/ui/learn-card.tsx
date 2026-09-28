'use client';

import React from 'react';
import type { ElementType } from 'react';

interface LearnTopic {
  id: string;
  icon: ElementType;
  color: string;
  title: string;
  subtitle: string;
  points: string[];
}

interface LearnCardProps {
  topic: LearnTopic;
}

export function LearnCard({ topic }: LearnCardProps) {
  const Icon = topic.icon;
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-civic-card hover:shadow-civic-card-hover transition-all flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-2xl ${topic.color}`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900 mb-0.5">{topic.title}</h3>
          <p className="text-xs text-slate-500 font-medium">{topic.subtitle}</p>
        </div>

        <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
          {topic.points.map((pt, idx) => (
            <li key={idx} className="flex items-start gap-2 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-1.5" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="pt-2 text-[11px] font-semibold text-indigo-700">Civic Standard Advisory</div>
    </div>
  );
}
