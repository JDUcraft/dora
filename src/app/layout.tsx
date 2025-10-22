import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "DORA Diagnostic - Profil d'équipe",
  description: "Identifiez le profil DORA de votre équipe de delivery software",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <html lang="fr">
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
