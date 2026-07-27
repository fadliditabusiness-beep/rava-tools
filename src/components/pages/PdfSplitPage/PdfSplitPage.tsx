import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import PdfSplitTool from "@/components/organisms/PdfSplitTool/PdfSplitTool";

export default function PdfSplitPage() {
  return (
    <ToolsPageTemplate title="Split PDF" description="Pisahkan setiap halaman PDF jadi file sendiri.">
      <PdfSplitTool />
    </ToolsPageTemplate>
  );
}
