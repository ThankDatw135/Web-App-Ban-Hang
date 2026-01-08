'use client';

import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1E1E1E',
            color: '#F5F1E8',
            border: '1px solid rgba(247, 245, 242, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#C9B37E',
              secondary: '#1E1E1E',
            },
          },
          error: {
            iconTheme: {
              primary: '#8B3A3A',
              secondary: '#1E1E1E',
            },
          },
        }}
      />
    </>
  );
}
