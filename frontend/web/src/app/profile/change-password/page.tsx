'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserLayout } from '@/components/layout';
import { usersService } from '@/services';
import { useAuthStore } from '@/stores';

export default function ChangePasswordPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const passwordChecks = {
    minLength: formData.newPassword.length >= 8,
    hasUpperLower: /[a-z]/.test(formData.newPassword) && /[A-Z]/.test(formData.newPassword),
    hasNumber: /\d/.test(formData.newPassword),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (!Object.values(passwordChecks).every(Boolean)) {
      setError('Please meet all password requirements');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await usersService.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      setSuccess(true);
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to change password');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <UserLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-heading text-3xl text-white mb-4">Please Sign In</h2>
            <Link href="/auth/login" className="text-muted-gold hover:text-white">Sign In</Link>
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <main className="pt-32 pb-20 px-4 md:px-12 max-w-[600px] mx-auto min-h-screen">
        <Link href="/profile" className="text-muted-gold text-sm hover:text-white transition-colors mb-6 inline-block">
          ← Back to Profile
        </Link>
        
        <h1 className="font-heading text-4xl text-white mb-2">Change Password</h1>
        <p className="text-gray-400 mb-8">Update your account password</p>

        <div className="bg-[#1A1A1D] rounded-xl p-8 border border-white/5">
          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm text-center">
              Password changed successfully!
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Password */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">Current Password</label>
              <div className="relative">
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  value={formData.currentPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  required
                  className="w-full bg-[#27272A] border border-white/10 rounded-lg px-4 py-3 pr-12 text-white focus:border-muted-gold focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                  required
                  className="w-full bg-[#27272A] border border-white/10 rounded-lg px-4 py-3 pr-12 text-white focus:border-muted-gold focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              
              {/* Password Requirements */}
              <div className="mt-3 space-y-1">
                {[
                  { check: passwordChecks.minLength, text: 'At least 8 characters' },
                  { check: passwordChecks.hasUpperLower, text: 'Uppercase and lowercase' },
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

            {/* Confirm Password */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">Confirm New Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                required
                className="w-full bg-[#27272A] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-muted-gold focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-muted-gold text-charcoal py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-[#d4c08a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </main>
    </UserLayout>
  );
}
