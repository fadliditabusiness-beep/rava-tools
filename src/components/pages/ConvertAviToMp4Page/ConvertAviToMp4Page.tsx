import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import VideoConverterTool from "@/components/organisms/VideoConverterTool/VideoConverterTool";
import { VIDEO_CONVERSIONS } from "@/utils/videoTools";

const spec = VIDEO_CONVERSIONS.find((s) => s.id === "avi-to-mp4")!;

export default function ConvertAviToMp4Page() {
  return (
    <ToolsPageTemplate title="Convert AVI → MP4" description="Ubah video AVI menjadi MP4.">
      <VideoConverterTool spec={spec} />
    </ToolsPageTemplate>
  );
}
