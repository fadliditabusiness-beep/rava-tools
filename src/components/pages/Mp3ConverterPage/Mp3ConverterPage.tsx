import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import AudioConverterHub from "@/components/organisms/AudioConverterHub/AudioConverterHub";
import { AUDIO_CONVERSIONS } from "@/utils/audioTools";

const specs = AUDIO_CONVERSIONS.filter((spec) => spec.id === "mp3-to-ogg");

export default function Mp3ConverterPage() {
  return (
    <ToolsPageTemplate title="MP3 Converter" description="Ubah file MP3 ke format OGG.">
      <AudioConverterHub specs={specs} accept="audio/mpeg,.mp3" />
    </ToolsPageTemplate>
  );
}
