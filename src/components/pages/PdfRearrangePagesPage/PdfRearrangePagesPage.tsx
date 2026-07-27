import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import PdfRearrangeTool from "@/components/organisms/PdfRearrangeTool/PdfRearrangeTool";

export default function PdfRearrangePagesPage() {
  return (
    <ToolsPageTemplate
      title="Rearrange PDF Pages"
      description="Ubah urutan halaman dalam PDF."
    >
      <PdfRearrangeTool />
    </ToolsPageTemplate>
  );
}
