import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/Header";

export const metadata: Metadata = {
  title: "StagePass — Concert Tickets",
  description:
    "Find and book the best seats for live concerts, festivals, and events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-600">
              <p>&copy; 2026 StagePass. All rights reserved.</p>
              <div className="flex gap-5">
                <span>Terms</span>
                <span>Privacy</span>
                <span>Support</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
