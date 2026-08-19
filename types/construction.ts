// Mirrors the `construction_projects` table defined in supabase/migrations/.
import type { ConstructionStatus, ConstructionType } from "@/types/database";

export type { ConstructionStatus, ConstructionType };

export interface ConstructionProject {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  location: string | null;
  city: string;
  projectType: ConstructionType;
  status: ConstructionStatus;
  completionPercentage: number;
  startDate: string | null;
  endDate: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectImage {
  id: string;
  projectId: string;
  storagePath: string;
  altText: string | null;
  sortOrder: number;
  isCover: boolean;
  createdAt: string;
}
