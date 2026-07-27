import { format as formatSqlQuery } from "sql-formatter";

export function formatJson(input: string): string {
  return JSON.stringify(JSON.parse(input), null, 2);
}

export function validateJson(input: string): string {
  const parsed = JSON.parse(input);
  return `✓ JSON valid.\n\n${JSON.stringify(parsed, null, 2)}`;
}

export async function formatJavaScript(code: string): Promise<string> {
  const [{ format }, babelPlugin, estreePlugin] = await Promise.all([
    import("prettier/standalone"),
    import("prettier/plugins/babel"),
    import("prettier/plugins/estree"),
  ]);
  return format(code, { parser: "babel", plugins: [babelPlugin, estreePlugin] });
}

export async function formatCss(code: string): Promise<string> {
  const [{ format }, postcssPlugin] = await Promise.all([
    import("prettier/standalone"),
    import("prettier/plugins/postcss"),
  ]);
  return format(code, { parser: "css", plugins: [postcssPlugin] });
}

export async function formatHtmlCode(code: string): Promise<string> {
  const [{ format }, babelPlugin, estreePlugin, postcssPlugin, htmlPlugin] = await Promise.all([
    import("prettier/standalone"),
    import("prettier/plugins/babel"),
    import("prettier/plugins/estree"),
    import("prettier/plugins/postcss"),
    import("prettier/plugins/html"),
  ]);
  return format(code, {
    parser: "html",
    plugins: [htmlPlugin, babelPlugin, estreePlugin, postcssPlugin],
  });
}

export function formatSql(query: string): string {
  return formatSqlQuery(query, { language: "sql" });
}

const XML_INDENT = "  ";

function serializeXmlNode(node: Node, depth: number): string {
  const indent = XML_INDENT.repeat(depth);

  if (node.nodeType === Node.PROCESSING_INSTRUCTION_NODE) {
    const pi = node as ProcessingInstruction;
    return `${indent}<?${pi.target} ${pi.data}?>\n`;
  }
  if (node.nodeType === Node.COMMENT_NODE) {
    return `${indent}<!--${node.textContent}-->\n`;
  }
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent?.trim();
    return text ? `${indent}${text}\n` : "";
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return "";

  const el = node as Element;
  const attrs = Array.from(el.attributes)
    .map((a) => ` ${a.name}="${a.value}"`)
    .join("");
  const children = Array.from(el.childNodes).filter(
    (c) => !(c.nodeType === Node.TEXT_NODE && !c.textContent?.trim()),
  );

  if (children.length === 0) {
    return `${indent}<${el.tagName}${attrs} />\n`;
  }
  if (children.length === 1 && children[0].nodeType === Node.TEXT_NODE) {
    return `${indent}<${el.tagName}${attrs}>${children[0].textContent?.trim()}</${el.tagName}>\n`;
  }

  const inner = children.map((c) => serializeXmlNode(c, depth + 1)).join("");
  return `${indent}<${el.tagName}${attrs}>\n${inner}${indent}</${el.tagName}>\n`;
}

export function formatXml(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) throw new Error("Input kosong.");

  const doc = new DOMParser().parseFromString(trimmed, "application/xml");
  if (doc.getElementsByTagName("parsererror").length > 0) {
    throw new Error("XML tidak valid.");
  }

  return Array.from(doc.childNodes)
    .map((n) => serializeXmlNode(n, 0))
    .join("")
    .trim();
}
