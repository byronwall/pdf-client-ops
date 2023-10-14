import Image from "next/image";

import { PdfMgr } from "~/components/pdf/PdfMgr";

export default function IndexPage() {
  return (
    <main className="flex flex-col gap-2">
      <div className="prose flex max-w-2xl flex-col gap-2 self-center">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" width={64} height={64} alt={"logo"} />
          <h1>PDF Client Tools</h1>
        </div>
        <p>
          Drag and drop a PDF file to get started. The file will be loaded and
          processed in your browser. No data is sent to a server. Once
          processed, you can drag pages to reorder them, delete pages, or rotate
          pages. When you are done, you can download the file.
        </p>
      </div>
      <PdfMgr />
    </main>
  );
}
