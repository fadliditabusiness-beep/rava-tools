import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import TextTransformTool from "@/components/organisms/TextTransformTool/TextTransformTool";
import { formatSql } from "@/utils/codeFormatters";

export default function SqlFormatterPage() {
  return (
    <ToolsPageTemplate title="SQL Formatter" description="Rapikan (pretty-print) query SQL.">
      <TextTransformTool
        inputLabel="SQL"
        actionLabel="Format"
        inputPlaceholder="select id,nama from users where aktif=1"
        transform={formatSql}
      />
    </ToolsPageTemplate>
  );
}
