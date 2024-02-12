import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {Space_Grotesk} from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/sonner";

const inter = Inter({subsets: ["latin"]});
const spaceGrotesk = Space_Grotesk({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Real Time Messaging App",
  description: "Generated with next 14 and supabase real time subscription",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
