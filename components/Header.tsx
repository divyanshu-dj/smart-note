'use client';

import { useTheme } from 'next-themes';
import useAuth from '../hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { LogOut, User as UserIcon, Moon, Sun } from 'lucide-react';

export default function Header() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
        
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Smart Notes
          </h1>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              {theme === 'dark' 
                ? <Sun className="h-5 w-5" /> 
                : <Moon className="h-5 w-5" />}
            </button>

            {/* User Section */}
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center">
                    <UserIcon className="h-4 w-4 text-white" />
                  </div>
                </div>
                <p className="hidden sm:block text-sm font-medium truncate max-w-[100px] text-slate-900 dark:text-white">
                  {user.displayName ?? user.email}
                </p>
                <button
                  onClick={() => signOut(auth)}
                  aria-label="Sign out"
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 border border-slate-200 dark:border-slate-600 hover:border-red-200 dark:hover:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 transition-all text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <a
                href="/login"
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 transition-all"
              >
                Sign In
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}