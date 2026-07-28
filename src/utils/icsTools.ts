export interface IcsEventInput {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
  description?: string;
}

function escapeIcsText(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function toIcsDateTime(date: string, time: string): string {
  const [y, m, d] = date.split("-");
  const [h, min] = time.split(":");
  return `${y}${m}${d}T${(h ?? "00").padStart(2, "0")}${(min ?? "00").padStart(2, "0")}00`;
}

export function buildIcsFile(event: IcsEventInput): string {
  const now = new Date();
  const stamp = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, "0")}${String(
    now.getUTCDate(),
  ).padStart(2, "0")}T${String(now.getUTCHours()).padStart(2, "0")}${String(now.getUTCMinutes()).padStart(
    2,
    "0",
  )}${String(now.getUTCSeconds()).padStart(2, "0")}Z`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Rava Tools//Calendar Event Generator//ID",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${crypto.randomUUID()}@rava-tools`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${toIcsDateTime(event.date, event.startTime)}`,
    `DTEND:${toIcsDateTime(event.date, event.endTime)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
  ];

  if (event.location) lines.push(`LOCATION:${escapeIcsText(event.location)}`);
  if (event.description) lines.push(`DESCRIPTION:${escapeIcsText(event.description)}`);

  lines.push("END:VEVENT", "END:VCALENDAR");

  return lines.join("\r\n");
}
