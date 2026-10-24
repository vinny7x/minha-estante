import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { ToastContainer } from 'react-toastify';

import "./globals.css";
import { Providers } from "./provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { NavBar } from "@/components/NavBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Minha Estante",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="pt-br" className={`scroll-smooth ${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider>
          <Providers>
            <NavBar />
            <main>
              {children}
            </main>
          </Providers>
        </ThemeProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover />
      </body>
    </html>
  );
}
