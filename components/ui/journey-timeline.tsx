'use client';

import React, { useState } from 'react';
import { JourneyStep, StepStatus } from '@/lib/types';
import { TimelineStep } from './timeline-step';

interface JourneyTimelineProps {
  steps: JourneyStep[];
  onStepStatusChange?: (stepId: string, newStatus: StepStatus) => void;
}

export function JourneyTimeline({ steps, onStepStatusChange }: JourneyTimelineProps) {
  const [localSteps, setLocalSteps] = useState<JourneyStep[]>(steps);

  const toggleStep = (stepId: string) => {
    const updated = localSteps.map((s) => {
      if (s.id === stepId) {
        let nextStatus: StepStatus = 'not_started';
        if (s.status === 'not_started') nextStatus = 'in_progress';
        else if (s.status === 'in_progress') nextStatus = 'completed';
        else if (s.status === 'completed') nextStatus = 'not_started';
        if (onStepStatusChange) onStepStatusChange(stepId, nextStatus);
        return { ...s, status: nextStatus };
      }
      return s;
    });
    setLocalSteps(updated);
  };

  return (
    <div className="space-y-6">
      <div className="relative pl-6 md:pl-8 border-l-2 border-slate-200 space-y-8 ml-3 sm:ml-4">
        {localSteps.map((step) => (
          <TimelineStep key={step.id} step={step} onToggle={toggleStep} />
        ))}
      </div>
    </div>
  );
}
