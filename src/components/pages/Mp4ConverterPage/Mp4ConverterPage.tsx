import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import VideoConverterHub from "@/components/organisms/VideoConverterHub/VideoConverterHub";
import { VIDEO_CONVERSIONS } from "@/utils/videoTools";

const SPEC_IDS = ["mp4-to-webm", "mp4-to-gif"];
const specs = VIDEO_CONVERSIONS.filter((spec) => SPEC_IDS.includes(spec.id));

export default function Mp4ConverterPage() {
  return (
    <ToolsPageTemplate title="MP4 Converter" description="Ubah video MP4 ke WebM atau GIF.">
      <VideoConverterHub specs={specs} accept="video/mp4,.mp4" fromLabel="MP4" />
    </ToolsPageTemplate>
  );
}
