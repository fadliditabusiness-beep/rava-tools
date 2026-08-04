import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import ImageConverterHub from "@/components/organisms/ImageConverterHub/ImageConverterHub";

export default function ImageConverterPage() {
  return (
    <ToolsPageTemplate
      title="Image Converter"
      description="Ubah gambar ke format PNG, JPG, atau WebP."
    >
      <ImageConverterHub
        accept="image/png,image/jpeg,image/webp"
        showQuality={true}
        showResize={false}
        actionLabel="Konversi"
      />
    </ToolsPageTemplate>
  );
}
