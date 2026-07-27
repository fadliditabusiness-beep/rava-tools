import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import PdfToImageTool from "@/components/organisms/PdfToImageTool/PdfToImageTool";

export default function PdfToJpgPage() {
  return (
    <ToolsPageTemplate title="PDF to JPG" description="Ubah setiap halaman PDF jadi gambar JPG.">
      <PdfToImageTool format="image/jpeg" extension="jpg" />
    </ToolsPageTemplate>
  );
}
