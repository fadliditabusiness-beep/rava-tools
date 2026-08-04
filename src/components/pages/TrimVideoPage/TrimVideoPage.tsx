import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import VideoTrimTool from "@/components/organisms/VideoTrimTool/VideoTrimTool";

export default function TrimVideoPage() {
  return (
    <ToolsPageTemplate title="Trim Video" description="Potong durasi video, ambil bagian tertentu.">
      <VideoTrimTool />
    </ToolsPageTemplate>
  );
}
