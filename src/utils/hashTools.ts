import md5 from "md5";

async function digestHex(algorithm: "SHA-1" | "SHA-256", input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest(algorithm, bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function generateHashes(input: string): Promise<string> {
  const [sha1, sha256] = await Promise.all([digestHex("SHA-1", input), digestHex("SHA-256", input)]);
  const md5Hash = md5(input);
  return [`MD5:     ${md5Hash}`, `SHA-1:   ${sha1}`, `SHA-256: ${sha256}`].join("\n");
}
