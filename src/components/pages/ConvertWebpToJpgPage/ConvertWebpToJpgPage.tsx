import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import ImageConverter from "@/components/organisms/ImageConverter/ImageConverter";

export default function ConvertWebpToJpgPage() {
  return (
    <ToolsPageTemplate title="Convert WebP → JPG" description="Ubah gambar WebP menjadi JPG.">
      <ImageConverter
        accept="image/webp"
        outputFileType="image/jpeg"
        outputExtension="jpg"
        showQuality
        showResize={false}
        actionLabel="Konversi ke JPG"
      />
    </ToolsPageTemplate>
  );
}
