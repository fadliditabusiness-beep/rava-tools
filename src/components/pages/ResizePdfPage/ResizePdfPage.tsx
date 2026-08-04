import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import PdfResizeTool from "@/components/organisms/PdfResizeTool/PdfResizeTool";

export default function ResizePdfPage() {
  return (
    <ToolsPageTemplate
      title="Resize PDF"
      description="Ubah ukuran halaman PDF (A4, Letter, dll)."
    >
      <PdfResizeTool />
    </ToolsPageTemplate>
  );
}
