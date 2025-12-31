'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const email = typeof window !== 'undefined' ? localStorage.getItem('resetEmail') || '' : '';
  const otp = typeof window !== 'undefined' ? localStorage.getItem('verifiedOtp') || '' : '';

  const passwordChecks = {
    minLength: formData.password.length >= 8,
    hasUpperLower: /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password),
    hasNumber: /\d/.test(formData.password),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!Object.values(passwordChecks).every(Boolean)) {
      setError('Please meet all password requirements');
      return;
    }

    setIsSubmitting(true);
    setError('');
    
    try {
      await authService.resetPassword({
        email,
        otp,
        newPassword: formData.password,
      });
      localStorage.removeItem('resetEmail');
      localStorage.removeItem('verifiedOtp');
      router.push('/auth/login?reset=success');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reset password.');
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
        </header>

        <main className="flex flex-1 items-center justify-center p-4">
          <div className="w-full max-w-[480px]">
            <div className="bg-[#221c10]/80 backdrop-blur-md border border-[#393328] rounded-xl shadow-2xl p-8 md:p-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="text-white font-heading text-3xl font-semibold mb-2">
                  Set New Password
                </h1>
                <p className="text-gray-400 text-sm">
                  Create a strong password for your account.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter new password"
                      required
                      className="w-full rounded-lg text-white border border-[#544b3b] bg-[#27231c] h-12 pl-4 pr-12 placeholder:text-gray-500 focus:outline-none focus:border-muted-gold transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {showPassword ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        )}
                      </svg>
                    </button>
                  </div>
                  
                  {/* Password Requirements */}
                  <div className="mt-3 space-y-1">
                    {[
                      { check: passwordChecks.minLength, text: 'At least 8 characters' },
                      { check: passwordChecks.hasUpperLower, text: 'Uppercase and lowercase letters' },
                      { check: passwordChecks.hasNumber, text: 'At least one number' },
                    ].map((req, i) => (
                      <div key={i} className={`flex items-center gap-2 text-xs ${req.check ? 'text-green-400' : 'text-gray-500'}`}>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {req.text}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Confirm new password"
                    required
                    className="w-full rounded-lg text-white border border-[#544b3b] bg-[#27231c] h-12 px-4 placeholder:text-gray-500 focus:outline-none focus:border-muted-gold transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-muted-gold text-[#181611] h-12 rounded-lg font-bold uppercase tracking-wider hover:bg-[#d4920f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
