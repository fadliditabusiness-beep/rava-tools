import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import CoreWebVitalsTool from "@/components/organisms/CoreWebVitalsTool/CoreWebVitalsTool";

export default function CoreWebVitalsPage() {
  return (
    <ToolsPageTemplate title="Core Web Vitals" description="Cek LCP, INP, & CLS website dari data Chrome UX Report.">
      <CoreWebVitalsTool />
    </ToolsPageTemplate>
  );
}
