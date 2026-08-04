import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import AudioConverterHub from "@/components/organisms/AudioConverterHub/AudioConverterHub";
import { AUDIO_CONVERSIONS } from "@/utils/audioTools";

const specs = AUDIO_CONVERSIONS.filter((spec) => spec.id === "mp4-to-mp3");

export default function Mp4ToMp3Page() {
  return (
    <ToolsPageTemplate title="Convert MP4 to MP3" description="Ambil audio dari video MP4 jadi MP3.">
      <AudioConverterHub specs={specs} accept="video/mp4,.mp4" />
    </ToolsPageTemplate>
  );
}
