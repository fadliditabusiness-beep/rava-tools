import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import VideoCompressTool from "@/components/organisms/VideoCompressTool/VideoCompressTool";

export default function CompressVideoPage() {
  return (
    <ToolsPageTemplate title="Compress Video" description="Perkecil ukuran file video (MP4, WebM, MOV, AVI, MKV).">
      <VideoCompressTool />
    </ToolsPageTemplate>
  );
}
