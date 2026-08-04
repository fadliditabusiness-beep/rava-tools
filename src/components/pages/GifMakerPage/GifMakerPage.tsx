import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import GifMakerTool from "@/components/organisms/GifMakerTool/GifMakerTool";

export default function GifMakerPage() {
  return (
    <ToolsPageTemplate title="GIF Maker" description="Gabungkan beberapa gambar jadi GIF animasi.">
      <GifMakerTool />
    </ToolsPageTemplate>
  );
}
