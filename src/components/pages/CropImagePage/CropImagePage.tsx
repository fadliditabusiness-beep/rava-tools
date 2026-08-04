import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import ImageCropTool from "@/components/organisms/ImageCropTool/ImageCropTool";

export default function CropImagePage() {
  return (
    <ToolsPageTemplate title="Crop Image" description="Potong area gambar sesuai posisi & ukuran.">
      <ImageCropTool />
    </ToolsPageTemplate>
  );
}
