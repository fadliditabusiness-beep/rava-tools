import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import VideoConverterTool from "@/components/organisms/VideoConverterTool/VideoConverterTool";
import { VIDEO_CONVERSIONS } from "@/utils/videoTools";

const spec = VIDEO_CONVERSIONS.find((s) => s.id === "gif-to-apng")!;

export default function GifToApngPage() {
  return (
    <ToolsPageTemplate title="Convert GIF to APNG" description="Ubah GIF menjadi APNG.">
      <VideoConverterTool spec={spec} />
    </ToolsPageTemplate>
  );
}
