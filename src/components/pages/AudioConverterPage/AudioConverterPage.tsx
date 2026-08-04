import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import AudioConverterHub from "@/components/organisms/AudioConverterHub/AudioConverterHub";
import { AUDIO_CONVERSIONS } from "@/utils/audioTools";

const SPEC_IDS = ["audio-to-mp3", "audio-to-ogg", "audio-to-wav"];
const specs = AUDIO_CONVERSIONS.filter((spec) => SPEC_IDS.includes(spec.id));

export default function AudioConverterPage() {
  return (
    <ToolsPageTemplate title="Audio Converter" description="Ubah audio ke format MP3, OGG, atau WAV.">
      <AudioConverterHub specs={specs} accept="audio/*" />
    </ToolsPageTemplate>
  );
}
