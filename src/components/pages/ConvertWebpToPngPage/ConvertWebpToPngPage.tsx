import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import ImageConverter from "@/components/organisms/ImageConverter/ImageConverter";

export default function ConvertWebpToPngPage() {
  return (
    <ToolsPageTemplate title="Convert WebP → PNG" description="Ubah gambar WebP menjadi PNG.">
      <ImageConverter
        accept="image/webp"
        outputFileType="image/png"
        outputExtension="png"
        showQuality={false}
        showResize={false}
        actionLabel="Konversi ke PNG"
      />
    </ToolsPageTemplate>
  );
}
