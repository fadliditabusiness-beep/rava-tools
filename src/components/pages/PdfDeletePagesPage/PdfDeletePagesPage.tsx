import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import PdfPageSelectionTool from "@/components/organisms/PdfPageSelectionTool/PdfPageSelectionTool";

export default function PdfDeletePagesPage() {
  return (
    <ToolsPageTemplate
      title="Delete PDF Pages"
      description="Hapus halaman tertentu dari PDF."
    >
      <PdfPageSelectionTool mode="delete" actionLabel="Hapus Halaman" outputSuffix="deleted" />
    </ToolsPageTemplate>
  );
}
