import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { AuthProvider } from '@/components/providers/auth-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LearnHub - E-Learning Platform',
  description: 'Comprehensive e-learning platform built with Next.js',
  keywords: ['e-learning', 'education', 'courses', 'online learning'],
  authors: [{ name: 'LearnHub Team' }],
  creator: 'LearnHub',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://learnhub.com',
    title: 'LearnHub - E-Learning Platform',
    description: 'Comprehensive e-learning platform built with Next.js',
    siteName: 'LearnHub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LearnHub - E-Learning Platform',
    description: 'Comprehensive e-learning platform built with Next.js',
    creator: '@learnhub',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <QueryProvider>
              {children}
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}