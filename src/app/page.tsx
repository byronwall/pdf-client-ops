import { FileDropzone } from "~/components/dropzone/FileDropzone";
import { PdfMgr } from "~/components/pdf/PdfMgr";

export default function IndexPage() {
  return (
    <FileDropzone>
      <main className="flex  flex-col ">
        <div className="prose ">
          <h1>PDF Client Tools</h1>
        </div>
        <PdfMgr />
      </main>
    </FileDropzone>
  );
}
