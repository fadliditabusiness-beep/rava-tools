import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import ImageFlipTool from "@/components/organisms/ImageFlipTool/ImageFlipTool";

export default function FlipImagePage() {
  return (
    <ToolsPageTemplate title="Flip Image" description="Balik gambar secara horizontal atau vertikal.">
      <ImageFlipTool />
    </ToolsPageTemplate>
  );
}
