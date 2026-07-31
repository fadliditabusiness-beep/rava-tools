import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import UrlDownloaderTool from "@/components/organisms/UrlDownloaderTool/UrlDownloaderTool";

export default function DownloadAudioUrlPage() {
  return (
    <ToolsPageTemplate
      title="Download Audio dari URL Langsung"
      description="Unduh audio langsung dari URL file-nya."
    >
      <UrlDownloaderTool placeholder="https://example.com/audio.mp3" previewKind="audio" fallbackFilename="audio.mp3" />
    </ToolsPageTemplate>
  );
}
