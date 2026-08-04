import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import VideoConverterHub from "@/components/organisms/VideoConverterHub/VideoConverterHub";
import { VIDEO_CONVERSIONS } from "@/utils/videoTools";

const SPEC_IDS = ["video-to-mp4", "video-to-webm", "video-to-gif"];
const specs = VIDEO_CONVERSIONS.filter((spec) => SPEC_IDS.includes(spec.id));

export default function VideoConverterPage() {
  return (
    <ToolsPageTemplate title="Video Converter" description="Ubah video ke format MP4, WebM, atau GIF.">
      <VideoConverterHub specs={specs} accept="video/*" fromLabel="Video" />
    </ToolsPageTemplate>
  );
}
