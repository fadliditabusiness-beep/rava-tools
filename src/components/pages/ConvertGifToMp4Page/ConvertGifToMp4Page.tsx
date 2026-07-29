import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import VideoConverterTool from "@/components/organisms/VideoConverterTool/VideoConverterTool";
import { VIDEO_CONVERSIONS } from "@/utils/videoTools";

const spec = VIDEO_CONVERSIONS.find((s) => s.id === "gif-to-mp4")!;

export default function ConvertGifToMp4Page() {
  return (
    <ToolsPageTemplate title="Convert GIF → MP4" description="Ubah GIF menjadi video MP4.">
      <VideoConverterTool spec={spec} />
    </ToolsPageTemplate>
  );
}
