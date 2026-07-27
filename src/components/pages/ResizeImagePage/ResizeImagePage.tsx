import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import ImageConverter from "@/components/organisms/ImageConverter/ImageConverter";

export default function ResizeImagePage() {
  return (
    <ToolsPageTemplate
      title="Resize Image"
      description="Ubah ukuran gambar (JPG, PNG, atau WebP) langsung di browser."
    >
      <ImageConverter
        accept="image/jpeg,image/png,image/webp"
        showQuality={false}
        showResize
        actionLabel="Ubah Ukuran"
      />
    </ToolsPageTemplate>
  );
}
