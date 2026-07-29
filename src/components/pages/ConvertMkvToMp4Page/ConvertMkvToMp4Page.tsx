import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import VideoConverterTool from "@/components/organisms/VideoConverterTool/VideoConverterTool";
import { VIDEO_CONVERSIONS } from "@/utils/videoTools";

const spec = VIDEO_CONVERSIONS.find((s) => s.id === "mkv-to-mp4")!;

export default function ConvertMkvToMp4Page() {
  return (
    <ToolsPageTemplate title="Convert MKV → MP4" description="Ubah video MKV menjadi MP4.">
      <VideoConverterTool spec={spec} />
    </ToolsPageTemplate>
  );
}
