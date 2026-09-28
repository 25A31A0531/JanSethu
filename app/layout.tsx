import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { DisclaimerBanner } from '@/components/ui/disclaimer-banner';
import { LanguageProvider } from '@/components/LanguageProvider';

export const metadata: Metadata = {
  title: 'JANSETU | AI-Powered Citizen Government-Service Navigator',
  description:
    'From “What do I need?” to “What do I do next?”. Convert life events into personalized, dependency-aware action plans for Indian government services.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-blue-500 selection:text-white">
        <LanguageProvider>
          <DisclaimerBanner />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
