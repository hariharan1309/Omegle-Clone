// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import React from 'react';

export const metadata: Metadata = {
  title: 'Omegle Clone',
  description: 'An Assignment for HomeShiksha',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
          <main className="flex min-h-screen flex-col items-center justify-between bg-white overflow-hidden">
                {children}
          </main>
      </body>
    </html>
  );
}
