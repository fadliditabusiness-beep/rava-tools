import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import ImageConverter from "@/components/organisms/ImageConverter/ImageConverter";

export default function ConvertPngToWebpPage() {
  return (
    <ToolsPageTemplate title="Convert PNG → WebP" description="Ubah gambar PNG menjadi WebP.">
      <ImageConverter
        accept="image/png"
        outputFileType="image/webp"
        outputExtension="webp"
        showQuality
        showResize={false}
        actionLabel="Konversi ke WebP"
      />
    </ToolsPageTemplate>
  );
}
