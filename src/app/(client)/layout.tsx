import type { Metadata } from "next";
import {Inter, Playfair_Display} from "next/font/google";
import Navbar from "@/components/Navbar";
import { ToastProvider } from "@/components/ui/toast";
import {AnimatePresence} from "motion/react";
import Footer from "@/components/Footer";

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
      <div className="bg-light min-h-screen">
        {/* <Navbar /> */}
        <AnimatePresence mode={"wait"}>
          {children}
        </AnimatePresence>
        <ToastProvider />
        {/* <Footer /> */}
      </div>
  );
}

