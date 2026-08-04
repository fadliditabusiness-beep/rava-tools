import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import AudioConverterHub from "@/components/organisms/AudioConverterHub/AudioConverterHub";
import { AUDIO_CONVERSIONS } from "@/utils/audioTools";

const specs = AUDIO_CONVERSIONS.filter((spec) => spec.id === "video-to-mp3");

export default function VideoToMp3Page() {
  return (
    <ToolsPageTemplate title="Convert Video to MP3" description="Ambil audio dari video apa pun jadi MP3.">
      <AudioConverterHub specs={specs} accept="video/*" />
    </ToolsPageTemplate>
  );
}
