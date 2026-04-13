import './global.css';
import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata:Metadata = {
  title: 'Recipe Vault',
  description: 'Manage our recipes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
