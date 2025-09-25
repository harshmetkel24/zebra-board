import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/providers/themeProvider";
import Footer from "@/components/ui/footer";
import { ClerkProvider } from "@clerk/nextjs";

import WithCustomTheme from "@/components/hocs/withCustomTheme";
import clsx from "clsx";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "zebra-board",
  description: "Practice your fingers here with 🦓",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={clsx(
            geistSans.className,
            geistMono.className,
            "${geistMono.variable} min-h-screen w-screen antialiased flex flex-col",
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <WithCustomTheme>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </WithCustomTheme>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
