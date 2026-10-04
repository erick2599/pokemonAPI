'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Requisito: Configurar staleTime a 24 horas
            staleTime: 24 * 60 * 60 * 1000, 
            gcTime: 24 * 60 * 60 * 1000 + 300000, // Conservar caché inactiva en memoria
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
