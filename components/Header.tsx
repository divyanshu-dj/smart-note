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
    <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
        
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Smart Notes
          </h1>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="p-2 rounded-lg hover:bg-indigo-600/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              {theme === 'dark' 
                ? <Sun className="h-5 w-5 text-indigo-300" /> 
                : <Moon className="h-5 w-5 text-indigo-500" />}
            </button>

            {/* User Section */}
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                    <UserIcon className="h-4 w-4 text-white" />
                  </div>
                </div>
                <p className="hidden sm:block text-sm font-medium truncate max-w-[100px]">
                  {user.displayName ?? user.email}
                </p>
                <button
                  onClick={() => signOut(auth)}
                  aria-label="Sign out"
                  className="p-2 rounded-lg hover:bg-red-600/20 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                >
                  <LogOut className="h-5 w-5 text-red-400" />
                </button>
              </div>
            ) : (
              <a
                href="/login"
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
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
