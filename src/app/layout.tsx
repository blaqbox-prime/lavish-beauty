import type { Metadata } from "next";
import { Inter, Imperial_Script, } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });
const playfair_Display = Imperial_Script({
  weight: "400",
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
})

export const metadata: Metadata = {
  title: "Lavish Beauty",
  description: "Bridal make up",
  keywords: ["bridal makeup", "bride makeup", "soft glam", "Make up in modimolle", "Make up in Lephalale"],
  icons: {
    icon: '/favicon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-serif ${playfair_Display.variable}`}>
        {children}
        
      <Toaster />
        </body>
    </html>
  );
}
