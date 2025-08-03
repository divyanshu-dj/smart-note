import { NextRequest, NextResponse } from 'next/server';
import { refineNote } from '@/lib/langchain/refineChain';

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
        { error: 'Note must be at least 10 characters long' },
        { status: 400 }
      );
    }
    const refinedNote = await refineNote(note);

    return NextResponse.json({ 
      refinedNote,
      success: true 
    });

  } catch (error) {
    console.error('API Error in /api/refine:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to refine note',
        success: false 
      },
      { status: 500 }
    );
  }
}
