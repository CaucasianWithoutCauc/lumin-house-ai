import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: 'Lumin House AI',
  description: 'Enterprise GPU Cloud - Access high-performance NVIDIA GPUs for AI/ML workloads',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 3,
  userScalable: true,
  viewportFit: 'cover', // Support for notched displays
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        {/* Force light mode for Fintech aesthetic - Revolut/N26 style */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Always use light mode for clean Fintech aesthetic
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen antialiased font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
