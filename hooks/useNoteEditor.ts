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
    
  };

  const handleTitle = async () => {
    
  };

  const acceptRefined = async () => {
    
  };

  const acceptTitle = async () => {
    
  };

  return {
    content,
    setContent,
    refined,
    setRefined,
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
