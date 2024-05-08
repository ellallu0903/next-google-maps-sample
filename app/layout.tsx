import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/common/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS Google maps API Sample",
  description: "with Google map API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-[100vh]">
          <div className="h-[calc(100%-72px)]">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
