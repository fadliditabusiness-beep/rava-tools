import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import PdfCropTool from "@/components/organisms/PdfCropTool/PdfCropTool";

export default function CropPdfPage() {
  return (
    <ToolsPageTemplate title="Crop PDF" description="Potong margin halaman PDF.">
      <PdfCropTool />
    </ToolsPageTemplate>
  );
}
