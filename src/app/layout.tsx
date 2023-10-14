import "~/styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import { type Metadata } from "next";

import { FileDropzone } from "~/components/dropzone/FileDropzone";

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
      <body className="flex min-h-screen p-4">
        <FileDropzone className="flex flex-1">
          <div className="flex flex-col">
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
