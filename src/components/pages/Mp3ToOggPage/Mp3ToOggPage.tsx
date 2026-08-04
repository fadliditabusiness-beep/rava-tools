import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import AudioConverterHub from "@/components/organisms/AudioConverterHub/AudioConverterHub";
import { AUDIO_CONVERSIONS } from "@/utils/audioTools";

const specs = AUDIO_CONVERSIONS.filter((spec) => spec.id === "mp3-to-ogg");

export default function Mp3ToOggPage() {
  return (
    <ToolsPageTemplate title="Convert MP3 to OGG" description="Ubah audio MP3 menjadi OGG.">
      <AudioConverterHub specs={specs} accept="audio/mpeg,.mp3" />
    </ToolsPageTemplate>
  );
}
