import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

// Initialize the Gemini model
const model = new ChatGoogleGenerativeAI({
  model: 'gemini-1.5-flash',
  temperature: 0.7,
  apiKey: process.env.GOOGLE_API_KEY,
});

// Create a prompt template for note refinement
const refinePrompt = PromptTemplate.fromTemplate(`
You are an expert writing assistant. Your task is to refine and improve the given note while maintaining the author's original intent and voice.

Please improve the note by:
1. Correcting any grammar, spelling, or punctuation errors
2. Enhancing clarity and readability
3. Improving sentence structure and flow
4. Adding appropriate transitions between ideas
5. Maintaining the original meaning and tone
6. Keeping the same approximate length unless expansion would significantly improve clarity

Original Note:
{note}

Refined Note:
`);

export const refineChain = refinePrompt.pipe(model).pipe(new StringOutputParser());

// Function to refine a note
export async function refineNote(noteContent: string): Promise<string> {
  try {
    const refinedNote = await refineChain.invoke({
      note: noteContent
    });
    
    return refinedNote.trim();
  } catch (error) {
    console.error('Error refining note:', error);
    throw new Error('Failed to refine note. Please try again.');
  }
}
