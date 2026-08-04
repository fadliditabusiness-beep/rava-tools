import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import ImageCompressorHub from "@/components/organisms/ImageCompressorHub/ImageCompressorHub";

export default function ImageCompressorPage() {
  return (
    <ToolsPageTemplate title="Image Compressor" description="Perkecil ukuran file gambar apa pun.">
      <ImageCompressorHub />
    </ToolsPageTemplate>
  );
}
