import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import ImageRotateTool from "@/components/organisms/ImageRotateTool/ImageRotateTool";

export default function RotateImagePage() {
  return (
    <ToolsPageTemplate title="Rotate Image" description="Putar gambar 90°, 180°, atau 270°.">
      <ImageRotateTool />
    </ToolsPageTemplate>
  );
}
