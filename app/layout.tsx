import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Conductor — Creative Workflow Orchestration',
  description:
    'AI-assisted creative workflow orchestration platform for designers. Transform creative briefs into structured direction and hero assets.',
  keywords: ['creative', 'design', 'AI', 'workflow', 'poster', 'branding'],
  authors: [{ name: 'Conductor' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
