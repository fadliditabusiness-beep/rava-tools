import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import PdfFlattenTool from "@/components/organisms/PdfFlattenTool/PdfFlattenTool";

export default function FlattenPdfPage() {
  return (
    <ToolsPageTemplate
      title="Flatten PDF"
      description="Kunci form field PDF jadi konten permanen."
    >
      <PdfFlattenTool />
    </ToolsPageTemplate>
  );
}
