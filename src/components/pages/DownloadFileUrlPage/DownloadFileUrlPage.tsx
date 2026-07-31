import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import UrlDownloaderTool from "@/components/organisms/UrlDownloaderTool/UrlDownloaderTool";

export default function DownloadFileUrlPage() {
  return (
    <ToolsPageTemplate title="Download File dari URL" description="Unduh file apa pun langsung dari URL-nya.">
      <UrlDownloaderTool placeholder="https://example.com/file.pdf" previewKind="none" fallbackFilename="download" />
    </ToolsPageTemplate>
  );
}
