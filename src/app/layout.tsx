import type { Metadata } from "next";
import { Inter, Playfair_Display, } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });
const playfair_Display = Playfair_Display({
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
      <body className={`${playfair_Display.variable} max-w-screen-xl`}>
        {children}
        
      <Toaster />
        </body>
    </html>
  );
}
