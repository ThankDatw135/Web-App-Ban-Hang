'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores';
import { authService } from '@/services';

export default function LoginPage() {
  const router = useRouter();
  const { login, setLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await authService.login(formData);
      login(response.user as any, response.accessToken);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log('Google login');
  };

  return (
    <div className="min-h-screen bg-[#181611] font-body text-white antialiased overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="h-full w-full bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#181611]/90 via-[#181611]/95 to-[#181611]"></div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-6 md:px-12 w-full">
          <Link href="/" className="flex items-center gap-3 select-none">
            <span className="text-muted-gold text-3xl">◆</span>
            <h2 className="text-white text-xl font-bold tracking-[0.2em] font-heading">LUXE</h2>
          </Link>
          <nav className="flex gap-4">
            <button className="hidden md:flex cursor-pointer items-center justify-center rounded-lg px-6 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-white">
              Contact Support
            </button>
            <Link 
              href="/auth/register" 
              className="flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#393328]/50 backdrop-blur-sm px-4 py-2 text-white text-sm font-bold leading-normal tracking-[0.015em] border border-transparent hover:border-muted-gold/50 transition-all duration-300 hover:bg-[#393328]"
            >
              <span>Register</span>
            </Link>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 items-center justify-center p-4">
          <div className="w-full max-w-[480px] flex flex-col">
            <div className="bg-[#221c10]/80 backdrop-blur-md border border-[#393328] rounded-xl shadow-2xl p-8 md:p-10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-muted-gold/40 to-transparent opacity-50"></div>
              
              <div className="flex flex-col gap-2 mb-8 text-center">
                <h1 className="text-white font-heading text-4xl font-semibold leading-tight tracking-tight">
                  Welcome Back
                </h1>
                <p className="text-gray-400 text-base font-normal">
                  Please enter your credentials to login.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-white text-sm font-medium leading-normal ml-1" htmlFor="email">
                    Email Address
                  </label>
                  <input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    required
                    className="flex w-full rounded-lg text-white focus:outline-0 focus:ring-1 focus:ring-muted-gold/50 border border-[#544b3b] bg-[#27231c] focus:border-muted-gold h-12 placeholder:text-gray-500 px-4 text-base font-normal transition-all duration-200"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-white text-sm font-medium leading-normal" htmlFor="password">
                      Password
                    </label>
                    <Link href="/auth/forgot-password" className="text-muted-gold text-sm hover:text-white transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative flex w-full items-center">
                    <input 
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      required
                      className="flex w-full rounded-lg text-white focus:outline-0 focus:ring-1 focus:ring-muted-gold/50 border border-[#544b3b] bg-[#27231c] focus:border-muted-gold h-12 placeholder:text-gray-500 pl-4 pr-12 text-base font-normal transition-all duration-200"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-0 h-full px-4 flex items-center justify-center text-gray-400 hover:text-white transition-colors focus:outline-none"
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
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-4 bg-muted-gold text-[#181611] text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#d4920f] hover:shadow-[0_0_15px_rgba(236,164,19,0.2)] active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </button>
              </form>

              {/* Divider */}
              <div className="relative py-6">
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#393328]"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#1e1913] px-2 text-xs text-gray-400 uppercase tracking-widest">Or</span>
                </div>
              </div>

              {/* Google Login */}
              <button 
                type="button"
                onClick={handleGoogleLogin}
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg h-12 px-4 border border-[#544b3b] bg-[#27231c] hover:bg-[#393328] text-white text-base font-semibold leading-normal transition-all duration-200 group"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4"></path>
                  <path d="M12.24 24.0008C15.4765 24.0008 18.2059 22.9382 20.1945 21.1039L16.3275 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.24 24.0008Z" fill="#34A853"></path>
                  <path d="M5.50253 14.3003C5.00236 12.8099 5.00236 11.1961 5.50253 9.70575V6.61481H1.51649C-0.185517 10.0056 -0.185517 14.0005 1.51649 17.3912L5.50253 14.3003Z" fill="#FBBC05"></path>
                  <path d="M12.24 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.24 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.24 4.74966Z" fill="#EA4335"></path>
                </svg>
                <span className="text-white group-hover:text-muted-gold transition-colors">Sign In with Google</span>
              </button>

              <div className="flex items-center justify-center gap-2 mt-6">
                <span className="text-gray-400 text-sm">Don't have an account?</span>
                <Link href="/auth/register" className="text-white text-sm font-bold hover:text-muted-gold transition-colors">
                  Sign Up
                </Link>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-6 text-xs text-gray-500">
              <Link href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
              <span className="select-none">•</span>
              <Link href="#" className="hover:text-gray-400 transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
