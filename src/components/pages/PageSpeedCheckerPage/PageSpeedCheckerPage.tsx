import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import PageSpeedCheckerTool from "@/components/organisms/PageSpeedCheckerTool/PageSpeedCheckerTool";

export default function PageSpeedCheckerPage() {
  return (
    <ToolsPageTemplate title="PageSpeed Checker" description="Cek skor performa website pakai Google PageSpeed Insights.">
      <PageSpeedCheckerTool />
    </ToolsPageTemplate>
  );
}
