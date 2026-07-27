import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import ImageConverter from "@/components/organisms/ImageConverter/ImageConverter";

export default function ConvertPngToJpgPage() {
  return (
    <ToolsPageTemplate title="Convert PNG → JPG" description="Ubah gambar PNG menjadi JPG.">
      <ImageConverter
        accept="image/png"
        outputFileType="image/jpeg"
        outputExtension="jpg"
        showQuality
        showResize={false}
        actionLabel="Konversi ke JPG"
      />
    </ToolsPageTemplate>
  );
}
