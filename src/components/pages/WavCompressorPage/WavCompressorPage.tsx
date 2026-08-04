import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import WavCompressTool from "@/components/organisms/WavCompressTool/WavCompressTool";

export default function WavCompressorPage() {
  return (
    <ToolsPageTemplate title="WAV Compressor" description="Perkecil ukuran file WAV.">
      <WavCompressTool />
    </ToolsPageTemplate>
  );
}
