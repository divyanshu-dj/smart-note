// app/page.tsx
'use client';

import AuthForm from '@/components/AuthForm';
import Header from '@/components/Header';
import useAuth from '@/hooks/useAuth';

export default function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <p className="text-lg">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <div className="w-full max-w-md px-4">
          <AuthForm />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome, {user.displayName ?? user.email}!
        </h2>
        {/* Your authenticated content goes here */}
      </main>
    </div>
  );
}
