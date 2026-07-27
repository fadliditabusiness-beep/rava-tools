import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import PdfToImageTool from "@/components/organisms/PdfToImageTool/PdfToImageTool";

export default function PdfToPngPage() {
  return (
    <ToolsPageTemplate title="PDF to PNG" description="Ubah setiap halaman PDF jadi gambar PNG.">
      <PdfToImageTool format="image/png" extension="png" />
    </ToolsPageTemplate>
  );
}
