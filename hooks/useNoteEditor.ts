'use client';

import { useState } from 'react';
import { saveRawNote, updateNote } from '@/lib/firestore';
import { toast } from 'sonner';
import useAuth from '@/hooks/useAuth';

export function useNoteEditor() {
  const { user } = useAuth();

  const [content, setContent] = useState('');
  const [noteId, setNoteId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [refined, setRefined] = useState('');
  const [suggestedTitle, setSuggestedTitle] = useState('');
  const [loading, setLoading] = useState<{ save: boolean; refine: boolean; title: boolean }>({
    save: false,
    refine: false,
    title: false,
  });
  const [error, setError] = useState<string | null>(null);

  const disabled = !user || content.trim() === '';

  const handleSave = async () => {
    if (disabled) return;
    setLoading((l) => ({ ...l, save: true }));
    setError(null);

    try {
      const id = await saveRawNote(user!.uid, content.trim(), title.trim());
      setNoteId(id);
      toast.success('Note saved');
    } catch (e: any) {
      setError('Failed to save the note. Please try again.');
    } finally {
      setLoading((l) => ({ ...l, save: false }));
    }
  };

  const handleRefine = async () => {
    if (disabled) return;
    setLoading((l) => ({ ...l, refine: true }));
    setError(null);

    try {
      const res = await fetch('/api/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: content }),
      });
      if (!res.ok) throw new Error('Refine API error');

      const { refinedNote } = await res.json();
      setRefined(refinedNote);
    } catch (e) {
      setError('Refine failed');
    } finally {
      setLoading((l) => ({ ...l, refine: false }));
    }
  };

  const handleTitle = async () => {
    if (disabled) return;
    setLoading((l) => ({ ...l, title: true }));
    setError(null);

    try {
      const res = await fetch('/api/title', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: refined || content }),
      });
      if (!res.ok) throw new Error('Title API error');

      const { title } = await res.json();
      setSuggestedTitle(title);
    } catch (e) {
      setError('Title generation failed');
    } finally {
      setLoading((l) => ({ ...l, title: false }));
    }
  };

  const acceptRefined = async () => {
    setContent(refined);
    setRefined('');
    if (noteId) {
      try {
        await updateNote(user!.uid, noteId, { content: refined, refined: true });
        toast.success('Refined note accepted');
      } catch {
        toast.error('Failed to save refined note');
      }
    } else {
      toast.success('Refined note accepted');
    }
  };

  const acceptTitle = async () => {
    setTitle(suggestedTitle);
    setSuggestedTitle('');
    if (noteId) {
    try {
      await updateNote(user!.uid, noteId, { title: suggestedTitle });
      setTitle(suggestedTitle);
      setSuggestedTitle('');
      toast.success('Title saved');
    } catch {
      toast.error('Failed to save title');
    }
    } else {
        toast.success('Refined title accepted');
    }
  };

  return {
    content,
    setContent,
    refined,
    setRefined,
    suggestedTitle,
    setSuggestedTitle,
    title,
    setTitle,
    loading,
    error,
    disabled,
    handleSave,
    handleRefine,
    handleTitle,
    acceptRefined,
    acceptTitle,
  };
}
