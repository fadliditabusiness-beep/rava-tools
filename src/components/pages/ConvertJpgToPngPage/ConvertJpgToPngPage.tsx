import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import ImageConverter from "@/components/organisms/ImageConverter/ImageConverter";

export default function ConvertJpgToPngPage() {
  return (
    <ToolsPageTemplate title="Convert JPG → PNG" description="Ubah gambar JPG menjadi PNG.">
      <ImageConverter
        accept="image/jpeg"
        outputFileType="image/png"
        outputExtension="png"
        showQuality={false}
        showResize={false}
        actionLabel="Konversi ke PNG"
      />
    </ToolsPageTemplate>
  );
}
