'use client';

import SaveButtons from '@/components/SaveButtons';
import { useNoteEditor } from '@/hooks/useNoteEditor';

export default function Editor() {
  const {
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
  } = useNoteEditor();

  

  return (
    <section className="max-w-4xl mx-auto mt-10 space-y-6 px-4">
      <div className="bg-slate-800 rounded-2xl shadow-xl p-6 space-y-6 border border-slate-700">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Note Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for your note..."
            className="w-full px-4 py-3 rounded-xl bg-slate-900 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Note Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start typing your note…"
            className="w-full h-60 px-4 py-3 rounded-xl bg-slate-900 text-slate-100 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        {/* Buttons */}
        <div className="pt-2 border-t border-slate-700">
          <SaveButtons
            disabled={disabled}
            loading={loading}
            onSave={handleSave}
            onRefine={handleRefine}
            onTitle={handleTitle}
          />
        </div>

        {error && (
          <p className="text-red-500 font-medium text-sm mt-2">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}
