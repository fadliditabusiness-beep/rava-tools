import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import RegexTesterTool from "@/components/organisms/RegexTesterTool/RegexTesterTool";

export default function RegexTesterPage() {
  return (
    <ToolsPageTemplate title="Regex Tester" description="Uji regular expression terhadap teks.">
      <RegexTesterTool />
    </ToolsPageTemplate>
  );
}
