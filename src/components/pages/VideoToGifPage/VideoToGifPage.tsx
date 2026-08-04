import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import VideoConverterTool from "@/components/organisms/VideoConverterTool/VideoConverterTool";
import { VIDEO_CONVERSIONS } from "@/utils/videoTools";

const spec = VIDEO_CONVERSIONS.find((s) => s.id === "video-to-gif")!;

export default function VideoToGifPage() {
  return (
    <ToolsPageTemplate title="Convert Video to GIF" description="Ubah video apa pun menjadi GIF.">
      <VideoConverterTool spec={spec} />
    </ToolsPageTemplate>
  );
}
