'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      await authService.forgotPassword({ email });
      // Store email for OTP verification
      localStorage.setItem('resetEmail', email);
      router.push('/auth/verify-otp');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#181611] font-body text-white antialiased">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="h-full w-full bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#181611]/90 via-[#181611]/95 to-[#181611]"></div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-6 py-6 md:px-12">
          <Link href="/" className="flex items-center gap-3 select-none">
            <span className="text-muted-gold text-3xl">◆</span>
            <h2 className="text-white text-xl font-bold tracking-[0.2em] font-heading">LUXE</h2>
          </Link>
          <Link 
            href="/auth/login"
            className="text-gray-400 text-sm hover:text-white transition-colors"
          >
            Back to Login
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center p-4">
          <div className="w-full max-w-[480px]">
            <div className="bg-[#221c10]/80 backdrop-blur-md border border-[#393328] rounded-xl shadow-2xl p-8 md:p-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-muted-gold/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-muted-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h1 className="text-white font-heading text-3xl font-semibold mb-2">
                  Forgot Password?
                </h1>
                <p className="text-gray-400 text-sm">
                  Enter your email address and we'll send you a verification code.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-lg text-white border border-[#544b3b] bg-[#27231c] h-12 px-4 placeholder:text-gray-500 focus:outline-none focus:border-muted-gold transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-muted-gold text-[#181611] h-12 rounded-lg font-bold uppercase tracking-wider hover:bg-[#d4920f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Verification Code'}
                </button>
              </form>

              <p className="text-center text-gray-500 text-sm mt-6">
                Remember your password?{' '}
                <Link href="/auth/login" className="text-muted-gold hover:text-white transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
