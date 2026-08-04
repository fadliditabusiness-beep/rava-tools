import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import PdfOrganizeTool from "@/components/organisms/PdfOrganizeTool/PdfOrganizeTool";

export default function OrganizePdfPage() {
  return (
    <ToolsPageTemplate
      title="Organize PDF"
      description="Urutkan ulang & hapus halaman PDF sekaligus."
    >
      <PdfOrganizeTool />
    </ToolsPageTemplate>
  );
}
