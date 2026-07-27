import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import ImageConverter from "@/components/organisms/ImageConverter/ImageConverter";

export default function CompressPngPage() {
  return (
    <ToolsPageTemplate
      title="Compress PNG"
      description="Kompres gambar PNG langsung di browser, tanpa upload ke server."
    >
      <ImageConverter
        accept="image/png"
        outputExtension="png"
        showQuality
        showResize
        actionLabel="Kompres Gambar"
      />
    </ToolsPageTemplate>
  );
}
