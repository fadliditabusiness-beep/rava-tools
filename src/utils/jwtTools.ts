function base64UrlDecode(segment: string): string {
  const padded = segment.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}

export function decodeJwt(token: string): string {
  const parts = token.trim().split(".");
  if (parts.length < 2) {
    throw new Error("Bukan JWT yang valid (harus punya bagian header.payload.signature).");
  }

  const header = JSON.parse(base64UrlDecode(parts[0]));
  const payload = JSON.parse(base64UrlDecode(parts[1]));

  let expiryLine = "";
  if (typeof payload.exp === "number") {
    const expDate = new Date(payload.exp * 1000);
    expiryLine = `\n\nKedaluwarsa (exp): ${expDate.toLocaleString("id-ID")}`;
  }

  return (
    ["Header:", JSON.stringify(header, null, 2), "", "Payload:", JSON.stringify(payload, null, 2)].join(
      "\n",
    ) +
    expiryLine +
    "\n\n(Catatan: signature tidak diverifikasi — ini murni decode, bukan validasi keaslian token.)"
  );
}
