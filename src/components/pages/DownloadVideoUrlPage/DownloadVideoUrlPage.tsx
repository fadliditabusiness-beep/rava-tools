import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import UrlDownloaderTool from "@/components/organisms/UrlDownloaderTool/UrlDownloaderTool";

export default function DownloadVideoUrlPage() {
  return (
    <ToolsPageTemplate
      title="Download Video dari URL Langsung"
      description="Unduh video (.mp4, .webm) langsung dari URL file-nya."
    >
      <UrlDownloaderTool placeholder="https://example.com/video.mp4" previewKind="video" fallbackFilename="video.mp4" />
    </ToolsPageTemplate>
  );
}
