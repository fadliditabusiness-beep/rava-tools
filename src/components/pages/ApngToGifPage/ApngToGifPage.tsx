import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import VideoConverterTool from "@/components/organisms/VideoConverterTool/VideoConverterTool";
import { VIDEO_CONVERSIONS } from "@/utils/videoTools";

const spec = VIDEO_CONVERSIONS.find((s) => s.id === "apng-to-gif")!;

export default function ApngToGifPage() {
  return (
    <ToolsPageTemplate title="Convert APNG to GIF" description="Ubah APNG menjadi GIF.">
      <VideoConverterTool spec={spec} />
    </ToolsPageTemplate>
  );
}
