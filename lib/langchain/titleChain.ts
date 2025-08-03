import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

// Initialize the Gemini model
const model = new ChatGoogleGenerativeAI({
  model: 'gemini-1.5-flash',
  temperature: 0.8,
  apiKey: process.env.GOOGLE_API_KEY,
});

// Create a prompt template for title generation
const titlePrompt = PromptTemplate.fromTemplate(`
You are an expert at creating engaging and descriptive titles. Based on the content of the note provided, generate a concise, compelling title that captures the main theme or key insight.

Requirements for the title:
1. Keep it between 3-8 words
2. Make it descriptive and engaging
3. Capture the main theme or key point
4. Avoid generic words like "Note", "Thoughts", "Ideas" unless they're essential
5. Use title case (capitalize major words)
6. Make it specific to the content

Note Content:
{note}

Generate only the title, nothing else:
`);

// Create the title generation chain
export const titleChain = titlePrompt.pipe(model).pipe(new StringOutputParser());

// Function to generate a title for a note
export async function generateTitle(noteContent: string): Promise<string> {
  try {
    const title = await titleChain.invoke({
      note: noteContent
    });
    
    return title.trim().replace(/['"]/g, ''); // Remove quotes if present
  } catch (error) {
    console.error('Error generating title:', error);
    throw new Error('Failed to generate title. Please try again.');
  }
}
