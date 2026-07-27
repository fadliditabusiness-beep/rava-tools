import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import PdfRotateTool from "@/components/organisms/PdfRotateTool/PdfRotateTool";

export default function PdfRotatePage() {
  return (
    <ToolsPageTemplate title="Rotate PDF" description="Putar halaman PDF 90°, 180°, atau 270°.">
      <PdfRotateTool />
    </ToolsPageTemplate>
  );
}
