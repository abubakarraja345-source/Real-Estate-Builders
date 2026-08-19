// Mirrors the `leads` table defined in supabase/migrations/.
import type { LeadSource, LeadStatus, LeadType } from "@/types/database";

export type { LeadSource, LeadStatus, LeadType };

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  source: LeadSource;
  leadType: LeadType;
  propertyId: string | null;
  projectId: string | null;
  status: LeadStatus;
  assignedTo: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}
