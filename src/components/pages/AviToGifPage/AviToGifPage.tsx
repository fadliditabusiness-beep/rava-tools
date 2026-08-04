import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import VideoConverterTool from "@/components/organisms/VideoConverterTool/VideoConverterTool";
import { VIDEO_CONVERSIONS } from "@/utils/videoTools";

const spec = VIDEO_CONVERSIONS.find((s) => s.id === "avi-to-gif")!;

export default function AviToGifPage() {
  return (
    <ToolsPageTemplate title="Convert AVI to GIF" description="Ubah video AVI menjadi GIF.">
      <VideoConverterTool spec={spec} />
    </ToolsPageTemplate>
  );
}
