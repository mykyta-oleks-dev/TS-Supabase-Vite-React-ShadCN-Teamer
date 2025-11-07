import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { Toaster } from './components/ui/sonner';
import router from './config/router';
import './index.css';
import QueryClientProvider from './providers/query';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider>
            <Toaster />
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>
);
