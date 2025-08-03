'use client';

import AuthForm from '@/components/AuthForm';
import AuthGuard from '@/components/AuthGuard';
import Header from '@/components/Header';
import Editor from '@/components/Editor';
import useAuth from '@/hooks/useAuth';

export default function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 dark:border-indigo-400 mx-auto mb-4"></div>
          <p className="text-lg">Loading…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
        <div className="w-full max-w-md px-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
            <AuthForm />
            <hr className="border-slate-200 dark:border-slate-700 my-6" />
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
              Demo credentials:<br />
              <strong className="text-slate-900 dark:text-slate-100">Email:</strong> testuser@example.com<br />
              <strong className="text-slate-900 dark:text-slate-100">Password:</strong> 123456
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
      <Header />

      <main className="max-w-4xl mx-auto p-6">
        <AuthGuard>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 space-y-6">
            <Editor />
          </div>
          
          <div className="border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 rounded-lg p-6 my-6 text-center">
            <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">📝 How to use Smart Notes</h3>
            <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <p>1️⃣ Write your note in the editor above (minimum 10 characters)</p>
              <p>💾 Use <strong className="text-slate-900 dark:text-slate-100">Save Note</strong> to save your raw content</p>
              <p>🤖 Use <strong className="text-slate-900 dark:text-slate-100">Refine Note</strong> to get AI-improved version</p>
              <p>🏷️ Use <strong className="text-slate-900 dark:text-slate-100">Generate Title</strong> to create a relevant title</p>
              <p>✅ Accept, ✏️ edit, or ❌ decline AI suggestions as needed</p>
            </div>
          </div>

        </AuthGuard>
      </main>
    </div>
  );
}