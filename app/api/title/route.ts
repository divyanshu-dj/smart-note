import { NextRequest, NextResponse } from 'next/server';
import { generateTitle } from '@/lib/langchain/titleChain';

export async function POST(request: NextRequest) {
  try {
    const { note } = await request.json();

    if (!note || typeof note !== 'string') {
      return NextResponse.json(
        { error: 'Note content is required and must be a string' },
        { status: 400 }
      );
    }

    if (note.trim().length < 10) {
      return NextResponse.json(
        { error: 'Note must be at least 10 characters long to generate a title' },
        { status: 400 }
      );
    }

    const title = await generateTitle(note);

    return NextResponse.json({ 
      title,
      success: true 
    });

  } catch (error) {
    console.error('API Error in /api/title:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to generate title',
        success: false 
      },
      { status: 500 }
    );
  }
}
