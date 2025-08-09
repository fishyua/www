import type { ReactNode } from "react";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "next-themes";
import { Navbar, NavbarItem } from "@/components/navbar";

const interFont = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${process.env.SITE_DOMAIN}`),
  title: "feiyeur",
  description: "hi. i live here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${interFont.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar>
            <NavbarItem href="/">feiyeur</NavbarItem>
            <NavbarItem href="/posts">posts</NavbarItem>
            <NavbarItem href="https://github.com/feiyeur" newWindow>
              github
            </NavbarItem>
          </Navbar>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
