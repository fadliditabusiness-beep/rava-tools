import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import ImageConverter from "@/components/organisms/ImageConverter/ImageConverter";

export default function CompressJpgPage() {
  return (
    <ToolsPageTemplate
      title="Compress JPG"
      description="Kompres gambar JPG langsung di browser, tanpa upload ke server."
    >
      <ImageConverter
        accept="image/jpeg"
        outputExtension="jpg"
        showQuality
        showResize
        actionLabel="Kompres Gambar"
      />
    </ToolsPageTemplate>
  );
}
