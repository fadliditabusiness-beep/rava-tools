import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import VideoCropTool from "@/components/organisms/VideoCropTool/VideoCropTool";

export default function CropVideoPage() {
  return (
    <ToolsPageTemplate title="Crop Video" description="Potong area video sesuai posisi & ukuran.">
      <VideoCropTool />
    </ToolsPageTemplate>
  );
}
