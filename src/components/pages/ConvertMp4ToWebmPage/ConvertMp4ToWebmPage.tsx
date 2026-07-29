import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import VideoConverterTool from "@/components/organisms/VideoConverterTool/VideoConverterTool";
import { VIDEO_CONVERSIONS } from "@/utils/videoTools";

const spec = VIDEO_CONVERSIONS.find((s) => s.id === "mp4-to-webm")!;

export default function ConvertMp4ToWebmPage() {
  return (
    <ToolsPageTemplate title="Convert MP4 → WebM" description="Ubah video MP4 menjadi WebM.">
      <VideoConverterTool spec={spec} />
    </ToolsPageTemplate>
  );
}
