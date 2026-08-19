// Shape is provisional until the Supabase `leads` table is defined
// in supabase/migrations/.

export type LeadSource = "property" | "construction" | "contact";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string;
  source: LeadSource;
  createdAt: string;
}
