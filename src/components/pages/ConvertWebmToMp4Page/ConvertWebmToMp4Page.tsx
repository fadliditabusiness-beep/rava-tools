import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import VideoConverterTool from "@/components/organisms/VideoConverterTool/VideoConverterTool";
import { VIDEO_CONVERSIONS } from "@/utils/videoTools";

const spec = VIDEO_CONVERSIONS.find((s) => s.id === "webm-to-mp4")!;

export default function ConvertWebmToMp4Page() {
  return (
    <ToolsPageTemplate title="Convert WebM → MP4" description="Ubah video WebM menjadi MP4.">
      <VideoConverterTool spec={spec} />
    </ToolsPageTemplate>
  );
}
