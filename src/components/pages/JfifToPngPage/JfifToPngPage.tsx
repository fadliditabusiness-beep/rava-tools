import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import ImageConverter from "@/components/organisms/ImageConverter/ImageConverter";

export default function JfifToPngPage() {
  return (
    <ToolsPageTemplate title="Convert JFIF to PNG" description="Ubah gambar JFIF menjadi PNG.">
      <ImageConverter
        accept=".jfif,image/jpeg"
        outputFileType="image/png"
        outputExtension="png"
        showQuality={false}
        showResize={false}
        actionLabel="Konversi ke PNG"
      />
    </ToolsPageTemplate>
  );
}
