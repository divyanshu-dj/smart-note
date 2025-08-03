
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
      <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
        <p className="text-lg">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
        <div className="w-full max-w-md px-4">
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <AuthForm />
            <hr className="border-slate-700 my-6" />
            <p className="text-sm text-slate-400 text-center">
              Demo credentials:<br />
              <strong>Email:</strong> testuser@example.com<br />
              <strong>Password:</strong> 123456
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />

      <main className="max-w-4xl mx-auto p-6">
        <AuthGuard>
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg space-y-6">
            <Editor />
            
          </div>
          <div className="border border-slate-700 bg-muted/50 rounded-lg p-6 my-6 text-center">
            <h3 className="text-lg font-semibold mb-2">📝 How to use Smart Notes</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>1️⃣ Write your note in the editor above (minimum 10 characters)</p>
              <p>💾 Use <strong>Save Note</strong> to save your raw content</p>
              <p>🤖 Use <strong>Refine Note</strong> to get AI-improved version</p>
              <p>🏷️ Use <strong>Generate Title</strong> to create a relevant title</p>
              <p>✅ Accept, ✏️ edit, or ❌ decline AI suggestions as needed</p>
            </div>
          </div>

        </AuthGuard>
      </main>
    </div>
  );
}
