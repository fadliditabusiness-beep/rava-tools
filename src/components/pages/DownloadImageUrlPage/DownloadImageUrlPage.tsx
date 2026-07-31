import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import UrlDownloaderTool from "@/components/organisms/UrlDownloaderTool/UrlDownloaderTool";

export default function DownloadImageUrlPage() {
  return (
    <ToolsPageTemplate title="Download Gambar dari URL" description="Unduh gambar langsung dari URL-nya.">
      <UrlDownloaderTool placeholder="https://example.com/gambar.jpg" previewKind="image" fallbackFilename="image.jpg" />
    </ToolsPageTemplate>
  );
}
