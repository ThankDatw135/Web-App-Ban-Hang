'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services';

export default function VerifyOTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(120);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const email = typeof window !== 'undefined' ? localStorage.getItem('resetEmail') || '' : '';

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    pastedData.split('').forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsSubmitting(true);
    setError('');
    
    try {
      await authService.verifyOtp({ email, otp: otpString });
      localStorage.setItem('verifiedOtp', otpString);
      router.push('/auth/reset-password');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    try {
      await authService.forgotPassword({ email });
      setTimer(120);
      setError('');
    } catch (err) {
      setError('Failed to resend code.');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
                <div className="w-16 h-16 rounded-full bg-muted-gold/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-muted-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h1 className="text-white font-heading text-3xl font-semibold mb-2">
                  Verify Your Identity
                </h1>
                <p className="text-gray-400 text-sm">
                  Enter the 6-digit code sent to<br />
                  <span className="text-muted-gold">{email || 'your email'}</span>
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* OTP Inputs */}
                <div className="flex justify-center gap-3" onPaste={handlePaste}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { inputRefs.current[index] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 text-center text-2xl font-bold rounded-lg border border-[#544b3b] bg-[#27231c] text-white focus:outline-none focus:border-muted-gold transition-colors"
                    />
                  ))}
                </div>

                {/* Timer */}
                <div className="text-center">
                  {timer > 0 ? (
                    <p className="text-gray-400 text-sm">
                      Code expires in <span className="text-muted-gold font-medium">{formatTime(timer)}</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      className="text-muted-gold text-sm hover:text-white transition-colors"
                    >
                      Resend Code
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || otp.join('').length !== 6}
                  className="w-full bg-muted-gold text-[#181611] h-12 rounded-lg font-bold uppercase tracking-wider hover:bg-[#d4920f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Verifying...' : 'Verify Code'}
                </button>
              </form>

              <p className="text-center text-gray-500 text-sm mt-6">
                <Link href="/auth/login" className="text-muted-gold hover:text-white transition-colors">
                  ← Back to Login
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
