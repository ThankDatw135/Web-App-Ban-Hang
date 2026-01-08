'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-warm-white/80 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            'w-full px-4 py-3',
            'bg-dark-surface border border-ivory/10 rounded-sm',
            'text-warm-white placeholder:text-soft-gray/60',
            'transition-all duration-fast ease-elegant',
            'focus:border-muted-gold/50 focus:ring-1 focus:ring-muted-gold/20 focus:outline-none',
            error && 'border-error/50 focus:border-error focus:ring-error/20',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-error">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
