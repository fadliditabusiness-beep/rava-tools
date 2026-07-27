import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import PdfPageSelectionTool from "@/components/organisms/PdfPageSelectionTool/PdfPageSelectionTool";

export default function PdfExtractPagesPage() {
  return (
    <ToolsPageTemplate
      title="Extract PDF Pages"
      description="Ambil halaman tertentu dari PDF jadi file baru."
    >
      <PdfPageSelectionTool mode="extract" actionLabel="Ambil Halaman" outputSuffix="extract" />
    </ToolsPageTemplate>
  );
}
