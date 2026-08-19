// Shape is provisional until the Supabase `construction_projects` table is
// defined in supabase/migrations/.

export type ConstructionProjectStatus = "planned" | "ongoing" | "completed";

export interface ConstructionProject {
  id: string;
  slug: string;
  title: string;
  status: ConstructionProjectStatus;
  description: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}
