import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import VideoConverterTool from "@/components/organisms/VideoConverterTool/VideoConverterTool";
import { VIDEO_CONVERSIONS } from "@/utils/videoTools";

const spec = VIDEO_CONVERSIONS.find((s) => s.id === "mov-to-gif")!;

export default function MovToGifPage() {
  return (
    <ToolsPageTemplate title="Convert MOV to GIF" description="Ubah video MOV menjadi GIF.">
      <VideoConverterTool spec={spec} />
    </ToolsPageTemplate>
  );
}
