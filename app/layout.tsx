import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pitchslap :: Smack my pitch up!",
  description: "Generate and refine story outlines",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center p-6 md:p-12 lg:p-24 bg-background text-foreground">
          {children}
        </main>
      </body>
    </html>
  );
}
