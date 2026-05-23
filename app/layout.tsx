import type { Metadata } from "next";
import Providers from "@/providers";
import './globals.css'


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin Dashboard built with Next.js, Tailwind Css, and React Query.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
           {children}
        </Providers>
      </body>
    </html>
  );
}
