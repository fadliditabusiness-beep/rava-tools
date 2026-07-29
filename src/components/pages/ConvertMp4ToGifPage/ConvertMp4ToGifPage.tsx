import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import VideoConverterTool from "@/components/organisms/VideoConverterTool/VideoConverterTool";
import { VIDEO_CONVERSIONS } from "@/utils/videoTools";

const spec = VIDEO_CONVERSIONS.find((s) => s.id === "mp4-to-gif")!;

export default function ConvertMp4ToGifPage() {
  return (
    <ToolsPageTemplate title="Convert MP4 → GIF" description="Ubah video MP4 menjadi GIF.">
      <VideoConverterTool spec={spec} />
    </ToolsPageTemplate>
  );
}
