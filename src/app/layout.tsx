import "~/styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import { type Metadata } from "next";

import { FileDropzone } from "~/components/dropzone/FileDropzone";
import { MainNav } from "~/components/nav/main-nav";
import { marketingConfig } from "~/config/marketing";

export const metadata: Metadata = {
  title: "PDF Client Tools",
  description: "A site process PDF files fully in the client.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <FileDropzone className="m-4">
          <div className="flex min-h-screen flex-col">
            <header className="container z-40 bg-background">
              <div className="flex h-20 items-center justify-between py-6">
                <MainNav items={marketingConfig.mainNav} />
              </div>
            </header>
            <main className="container flex max-w-full flex-1 shrink-0 flex-col gap-4 overflow-x-hidden pb-8">
              {children}
            </main>
          </div>

          <Analytics />
        </FileDropzone>
      </body>
    </html>
  );
}
