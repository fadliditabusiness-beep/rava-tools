import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import GifCompressTool from "@/components/organisms/GifCompressTool/GifCompressTool";

export default function GifCompressorPage() {
  return (
    <ToolsPageTemplate title="GIF Compressor" description="Perkecil ukuran file GIF animasi.">
      <GifCompressTool />
    </ToolsPageTemplate>
  );
}
