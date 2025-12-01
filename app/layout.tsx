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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Script to detect system color scheme preference and apply dark/light mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getTheme() {
                  if (typeof window !== 'undefined') {
                    // Check system preference
                    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                      return 'dark';
                    }
                    return 'light';
                  }
                  return 'light';
                }
                
                const theme = getTheme();
                document.documentElement.classList.add(theme);
                
                // Listen for system theme changes
                if (typeof window !== 'undefined') {
                  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
                    document.documentElement.classList.remove('light', 'dark');
                    document.documentElement.classList.add(e.matches ? 'dark' : 'light');
                  });
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
