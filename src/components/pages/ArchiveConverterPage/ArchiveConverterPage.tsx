import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import ArchiveConverterTool from "@/components/organisms/ArchiveConverterTool/ArchiveConverterTool";

export default function ArchiveConverterPage() {
  return (
    <ToolsPageTemplate
      title="Archive Converter"
      description="Buat & ekstrak arsip ZIP, TAR, atau TAR.GZ."
    >
      <ArchiveConverterTool />
    </ToolsPageTemplate>
  );
}
