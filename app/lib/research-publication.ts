export const researchFields = ["biography", "gameplay", "weapon", "battles", "relationships", "unlockCondition", "spoilerNotes"] as const;
export type ResearchField = typeof researchFields[number];
export type ResearchRow = {
  id: number; status: string; approvedFields: string; updatedAt: string;
  biography: string; gameplay: string; weapon: string; battles: string;
  relationships: string; unlockCondition: string; spoilerNotes: string;
  sourceUrl: string; sourceNote: string;
};
export type PublishedResearch = {
  biography?: string; gameplay?: string; weapon?: string; battles?: string[];
  relationships?: string[]; unlockCondition?: string; spoilerNotes?: string;
};

export function stringList(value: unknown): string[] {
  try {
    const list: unknown = typeof value === "string" ? JSON.parse(value) : value;
    return Array.isArray(list) ? list.filter((v): v is string => typeof v === "string") : [];
  } catch { return []; }
}
export function isSourceUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try { return ["http:", "https:"].includes(new URL(value).protocol); } catch { return false; }
}
export function selectedFields(value: unknown): ResearchField[] | null {
  if (!Array.isArray(value) || value.some(v => !researchFields.includes(v))) return null;
  return researchFields.filter(field => value.includes(field));
}
export function validatePublication(item: ResearchRow, fields: ResearchField[], battleIds: string[]): string | null {
  if (!fields.length) return "Select at least one research field to publish.";
  if (!isSourceUrl(item.sourceUrl)) return "A source must use an HTTP or HTTPS URL before publication.";
  for (const field of fields) {
    if (field === "battles" || field === "relationships") {
      let list: unknown;
      try { list = JSON.parse(item[field]); } catch { return `Invalid ${field} list.`; }
      if (!Array.isArray(list) || list.some(v => typeof v !== "string" || !v.trim())) return `Invalid ${field} list.`;
      if (field === "battles" && list.some(id => !battleIds.includes(id))) return "Use existing MusouDB battle IDs before publishing battles.";
    } else if (!item[field].trim()) return `The selected ${field} field is empty.`;
  }
  return null;
}

// Approved fields are projected at read time. A later decision can retract one
// field without stale copied text remaining in archive_records.
export function publishResearch(rows: ResearchRow[]) {
  const fields: PublishedResearch = {};
  const owners = new Map<ResearchField, ResearchRow>();
  const ordered = rows.filter(row => row.status === "approved" && isSourceUrl(row.sourceUrl))
    .sort((a, b) => a.updatedAt.localeCompare(b.updatedAt) || a.id - b.id);
  for (const row of ordered) {
    for (const field of selectedFields(stringList(row.approvedFields)) ?? []) {
      if (field === "battles" || field === "relationships") fields[field] = stringList(row[field]);
      else fields[field] = row[field];
      owners.set(field, row);
    }
  }
  const sources = [...new Set(owners.values())].map(row => ({
    label: row.sourceNote || "Contributor research source", url: row.sourceUrl, kind: "community",
    fields: researchFields.filter(field => owners.get(field) === row),
  }));
  return { fields, sources, approvedCount: owners.size };
}
