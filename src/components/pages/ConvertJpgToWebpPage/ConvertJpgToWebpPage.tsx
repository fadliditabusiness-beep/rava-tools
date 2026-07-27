import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import ImageConverter from "@/components/organisms/ImageConverter/ImageConverter";

export default function ConvertJpgToWebpPage() {
  return (
    <ToolsPageTemplate title="Convert JPG → WebP" description="Ubah gambar JPG menjadi WebP.">
      <ImageConverter
        accept="image/jpeg"
        outputFileType="image/webp"
        outputExtension="webp"
        showQuality
        showResize={false}
        actionLabel="Konversi ke WebP"
      />
    </ToolsPageTemplate>
  );
}
