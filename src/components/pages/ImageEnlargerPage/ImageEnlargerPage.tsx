import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import ImageEnlargerTool from "@/components/organisms/ImageEnlargerTool/ImageEnlargerTool";

export default function ImageEnlargerPage() {
  return (
    <ToolsPageTemplate title="Image Enlarger" description="Perbesar ukuran gambar 2x, 3x, atau 4x.">
      <ImageEnlargerTool />
    </ToolsPageTemplate>
  );
}
