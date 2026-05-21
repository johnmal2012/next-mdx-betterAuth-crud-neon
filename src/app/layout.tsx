import type { Metadata } from 'next';
import { Inter, Geist } from 'next/font/google';
import '@/app/globals.css';
import { physicianData } from '@/data/physician';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: `${physicianData.logo} - ${physicianData.specialty}`,
  description: `${physicianData.clinicName}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn('antialiased', inter.variable, 'font-sans', geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
