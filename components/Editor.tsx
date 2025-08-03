'use client';

import SaveButtons from '@/components/SaveButtons';
import { useNoteEditor } from '@/hooks/useNoteEditor';

export default function Editor() {
  const {
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
  } = useNoteEditor();

  const declineRefined = () => setRefined('');
  const declineTitle = () => setSuggestedTitle('');

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

      {/* AI-Refined Note */}
      {refined && (
        <div className="bg-slate-800 rounded-2xl shadow-xl p-6 border border-slate-700 space-y-4">
          <h3 className="text-lg font-semibold text-indigo-300">✨ AI-Refined Note</h3>
          <pre className="whitespace-pre-wrap text-slate-100">{refined}</pre>
          <div className="flex gap-3">
            <button onClick={acceptRefined} className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition">
              Accept
            </button>
            <button onClick={declineRefined} className="px-4 py-2 rounded-lg border border-red-500 text-red-300 hover:bg-slate-700 transition">
              Decline
            </button>
          </div>
        </div>
      )}

      {/* AI-Generated Title */}
      {suggestedTitle && (
        <div className="bg-slate-800 rounded-2xl shadow-xl p-6 border border-slate-700 space-y-4">
          <h3 className="text-lg font-semibold text-indigo-300">🏷️ Suggested Title</h3>
          <p className="text-slate-100 text-lg">{suggestedTitle}</p>
          <div className="flex gap-3">
            <button onClick={acceptTitle} className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition">
              Accept
            </button>
            <button onClick={declineTitle} className="px-4 py-2 rounded-lg border border-red-500 text-red-300 hover:bg-slate-700 transition">
              Decline
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
