import { NextRequest, NextResponse } from 'next/server';
import {
  classifyLifeEvent,
  findRelevantServices,
  generateActionPlan,
  generateClarifyingQuestions,
} from '@/lib/aiService';
import { CitizenProfile, LifeEvent } from '@/lib/types';
import { DOCUMENT_TYPES, LIFE_EVENTS } from '@/lib/demoData';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, profile } = body;

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'A natural language query is required.' },
        { status: 400 }
      );
    }

    const classification = await classifyLifeEvent(query);
    if (classification.requiresClarification || classification.primaryIntent === 'other') {
      return NextResponse.json(
        {
          success: false,
          classification,
          error: classification.clarificationPrompt || 'Please provide a government-service related situation.',
        },
        { status: 422 }
      );
    }
    const lifeEvent = LIFE_EVENTS.find((e) => e.id === classification.primaryIntent);
    if (!lifeEvent) {
      return NextResponse.json({ success: false, error: 'No matching life event found.' }, { status: 422 });
    }

    const defaultProfile: CitizenProfile = {
      residenceState: 'Andhra Pradesh',
      annualIncome: 250000,
      ...profile,
      ...(classification.extractedContext || {}),
    };

    const questions = await generateClarifyingQuestions(defaultProfile, lifeEvent);
    const { recommendations, excludedServices } = await findRelevantServices(
      defaultProfile,
      lifeEvent,
      query
    );
    const steps = await generateActionPlan(
      defaultProfile,
      recommendations.map((r) => r.service)
    );

    const requiredDocIds = Array.from(
      new Set(recommendations.flatMap((r) => r.service.requiredDocuments))
    );
    const totalRequired = requiredDocIds.length;
    const readyCount = requiredDocIds.filter(
      (id) => DOCUMENT_TYPES.find((d) => d.id === id)?.status === 'ready'
    ).length;
    const percentage = totalRequired > 0 ? Math.round((readyCount / totalRequired) * 100) : 100;

    return NextResponse.json({
      success: true,
      classification,
      lifeEvent,
      questions,
      recommendations,
      excludedServices,
      steps,
      documentReadiness: {
        totalRequired,
        readyCount,
        missingCount: totalRequired - readyCount,
        percentage,
      },
    });
  } catch (error: any) {
    console.error('[API /api/analyze] Error processing request:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to analyze situation. Please try again.',
      },
      { status: 500 }
    );
  }
}
