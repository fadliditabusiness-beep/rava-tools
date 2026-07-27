import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import PdfImagesToPdfTool from "@/components/organisms/PdfImagesToPdfTool/PdfImagesToPdfTool";

export default function ImageToPdfPage() {
  return (
    <ToolsPageTemplate title="Image to PDF" description="Gabungkan gambar JPG/PNG jadi satu file PDF.">
      <PdfImagesToPdfTool />
    </ToolsPageTemplate>
  );
}
