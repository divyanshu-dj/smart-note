
'use client';

import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="max-w-sm m-auto mt-10 bg-gray-800 p-6 rounded shadow text-white">
      <h2 className="text-xl font-bold mb-4">
        {isRegistering ? 'Register' : 'Login'}
      </h2>
      <p className="text-gray-400 mb-4">
        {isRegistering
          ? 'Create a new account'
          : 'Welcome back! Please log in.'}
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
        >
          {isRegistering ? 'Sign Up' : 'Log In'}
        </button>
        <p className="text-sm text-gray-400 text-center">
          {isRegistering ? 'Already have an account?' : 'New user?'}{' '}
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="underline"
          >
            {isRegistering ? 'Login here' : 'Register here'}
          </button>
        </p>
      </form>
    </div>
  );
}
