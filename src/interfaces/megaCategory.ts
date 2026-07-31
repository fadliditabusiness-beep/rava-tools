export interface MegaTool {
  title: string;
  description?: string;
  href?: string;
  status: "live" | "coming-soon";
}

export interface MegaSubcategory {
  id: string;
  title: string;
  tools: MegaTool[];
}

export interface MegaCategoryGroup {
  id: string;
  title: string;
  subcategories: MegaSubcategory[];
}
