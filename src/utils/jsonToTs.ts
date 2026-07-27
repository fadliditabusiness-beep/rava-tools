type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

function toPascalCase(name: string): string {
  const cleaned = name
    .replace(/[^a-zA-Z0-9]+(.)/g, (_match, c: string) => c.toUpperCase())
    .replace(/^[^a-zA-Z_]+/, "");
  const withInitialCap = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  return withInitialCap || "Root";
}

function inferType(value: JsonValue, name: string, interfaces: Map<string, string>): string {
  if (value === null) return "null";

  if (Array.isArray(value)) {
    if (value.length === 0) return "unknown[]";
    const elementTypes = new Set(value.map((item) => inferType(item, `${name}Item`, interfaces)));
    const elementType = elementTypes.size === 1 ? [...elementTypes][0] : `(${[...elementTypes].join(" | ")})`;
    return `${elementType}[]`;
  }

  switch (typeof value) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "object": {
      const interfaceName = toPascalCase(name);
      buildInterface(value as Record<string, JsonValue>, interfaceName, interfaces);
      return interfaceName;
    }
    default:
      return "unknown";
  }
}

function buildInterface(
  obj: Record<string, JsonValue>,
  name: string,
  interfaces: Map<string, string>,
): void {
  const lines = [`export interface ${name} {`];
  for (const [key, value] of Object.entries(obj)) {
    const propType = inferType(value, key, interfaces);
    const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
    lines.push(`  ${safeKey}: ${propType};`);
  }
  lines.push("}");
  interfaces.set(name, lines.join("\n"));
}

export function jsonToTypeScript(input: string, rootName = "Root"): string {
  const parsed = JSON.parse(input) as JsonValue;
  const interfaces = new Map<string, string>();

  if (Array.isArray(parsed)) {
    const elementType = parsed.length > 0 ? inferType(parsed[0], `${rootName}Item`, interfaces) : "unknown";
    const body = [...interfaces.values()].join("\n\n");
    const typeAlias = `export type ${rootName} = ${elementType}[];`;
    return body ? `${body}\n\n${typeAlias}` : typeAlias;
  }

  if (parsed !== null && typeof parsed === "object") {
    buildInterface(parsed, rootName, interfaces);
    return [...interfaces.values()].join("\n\n");
  }

  return `export type ${rootName} = ${inferType(parsed, rootName, interfaces)};`;
}
