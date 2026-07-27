import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import PdfMergeTool from "@/components/organisms/PdfMergeTool/PdfMergeTool";

export default function PdfMergePage() {
  return (
    <ToolsPageTemplate
      title="Merge PDF"
      description="Gabungkan beberapa file PDF jadi satu, langsung di browser."
    >
      <PdfMergeTool />
    </ToolsPageTemplate>
  );
}
