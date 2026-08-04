import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import AudioCompressTool from "@/components/organisms/AudioCompressTool/AudioCompressTool";

export default function Mp3CompressorPage() {
  return (
    <ToolsPageTemplate title="MP3 Compressor" description="Perkecil ukuran file MP3.">
      <AudioCompressTool />
    </ToolsPageTemplate>
  );
}
