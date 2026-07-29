import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import VideoConverterTool from "@/components/organisms/VideoConverterTool/VideoConverterTool";
import { VIDEO_CONVERSIONS } from "@/utils/videoTools";

const spec = VIDEO_CONVERSIONS.find((s) => s.id === "mov-to-mp4")!;

export default function ConvertMovToMp4Page() {
  return (
    <ToolsPageTemplate title="Convert MOV → MP4" description="Ubah video MOV menjadi MP4.">
      <VideoConverterTool spec={spec} />
    </ToolsPageTemplate>
  );
}
