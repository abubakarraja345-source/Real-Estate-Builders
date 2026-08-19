// Hand-written to match supabase/migrations/. Once the Supabase project is
// linked, regenerate from the real database (this file should then match
// almost exactly) with:
//   npx supabase gen types typescript --project-id <project-id> > types/database.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AppRole = "admin" | "editor";
export type ListingPurpose = "buy" | "rent";
export type PropertyCategory = "residential" | "commercial" | "plot";
export type PropertyStatus =
  | "available"
  | "under_offer"
  | "sold"
  | "rented"
  | "archived";
export type AreaUnit = "marla" | "kanal" | "sqft" | "sqyd";
export type ConstructionStatus = "planned" | "ongoing" | "completed" | "on_hold";
export type ConstructionType =
  | "residential"
  | "commercial"
  | "renovation"
  | "interior"
  | "infrastructure"
  | "other";
export type LeadSource =
  | "website"
  | "whatsapp"
  | "facebook"
  | "instagram"
  | "phone"
  | "walk_in"
  | "other";
export type LeadType =
  | "buy"
  | "rent"
  | "sell"
  | "construction"
  | "consultation"
  | "general";
export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "viewing"
  | "negotiation"
  | "closed"
  | "lost";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string | null;
          role: AppRole;
          avatar_path: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          email?: string | null;
          role?: AppRole;
          avatar_path?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      properties: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string | null;
          property_type: string;
          purpose: ListingPurpose;
          category: PropertyCategory;
          status: PropertyStatus;
          price: number | null;
          price_is_visible: boolean;
          area: number | null;
          area_unit: AreaUnit;
          bedrooms: number | null;
          bathrooms: number | null;
          parking_spaces: number | null;
          address: string | null;
          city: string;
          neighborhood: string;
          latitude: number | null;
          longitude: number | null;
          is_featured: boolean;
          is_published: boolean;
          contact_name: string | null;
          contact_phone: string | null;
          contact_email: string | null;
          meta_title: string | null;
          meta_description: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description?: string | null;
          property_type: string;
          purpose: ListingPurpose;
          category: PropertyCategory;
          status?: PropertyStatus;
          price?: number | null;
          price_is_visible?: boolean;
          area?: number | null;
          area_unit?: AreaUnit;
          bedrooms?: number | null;
          bathrooms?: number | null;
          parking_spaces?: number | null;
          address?: string | null;
          city?: string;
          neighborhood?: string;
          latitude?: number | null;
          longitude?: number | null;
          is_featured?: boolean;
          is_published?: boolean;
          contact_name?: string | null;
          contact_phone?: string | null;
          contact_email?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["properties"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "properties_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      property_images: {
        Row: {
          id: string;
          property_id: string;
          storage_path: string;
          alt_text: string | null;
          sort_order: number;
          is_cover: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          storage_path: string;
          alt_text?: string | null;
          sort_order?: number;
          is_cover?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["property_images"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "property_images_property_id_fkey";
            columns: ["property_id"];
            isOneToOne: false;
            referencedRelation: "properties";
            referencedColumns: ["id"];
          },
        ];
      };
      construction_projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string | null;
          location: string | null;
          city: string;
          project_type: ConstructionType;
          status: ConstructionStatus;
          completion_percentage: number;
          start_date: string | null;
          end_date: string | null;
          is_featured: boolean;
          is_published: boolean;
          meta_title: string | null;
          meta_description: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description?: string | null;
          location?: string | null;
          city?: string;
          project_type?: ConstructionType;
          status?: ConstructionStatus;
          completion_percentage?: number;
          start_date?: string | null;
          end_date?: string | null;
          is_featured?: boolean;
          is_published?: boolean;
          meta_title?: string | null;
          meta_description?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["construction_projects"]["Insert"]
        >;
        Relationships: [
          {
            foreignKeyName: "construction_projects_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      project_images: {
        Row: {
          id: string;
          project_id: string;
          storage_path: string;
          alt_text: string | null;
          sort_order: number;
          is_cover: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          storage_path: string;
          alt_text?: string | null;
          sort_order?: number;
          is_cover?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["project_images"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "construction_projects";
            referencedColumns: ["id"];
          },
        ];
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string | null;
          content: string | null;
          cover_image_path: string | null;
          author_id: string | null;
          is_published: boolean;
          published_at: string | null;
          seo_title: string | null;
          seo_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt?: string | null;
          content?: string | null;
          cover_image_path?: string | null;
          author_id?: string | null;
          is_published?: boolean;
          published_at?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["blog_posts"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      leads: {
        Row: {
          id: string;
          name: string;
          phone: string;
          email: string | null;
          message: string | null;
          source: LeadSource;
          lead_type: LeadType;
          property_id: string | null;
          project_id: string | null;
          status: LeadStatus;
          assigned_to: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          email?: string | null;
          message?: string | null;
          source?: LeadSource;
          lead_type?: LeadType;
          property_id?: string | null;
          project_id?: string | null;
          status?: LeadStatus;
          assigned_to?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "leads_property_id_fkey";
            columns: ["property_id"];
            isOneToOne: false;
            referencedRelation: "properties";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "leads_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "construction_projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "leads_assigned_to_fkey";
            columns: ["assigned_to"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_staff: {
        Args: Record<string, never>;
        Returns: boolean;
      };
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: {
      app_role: AppRole;
      listing_purpose: ListingPurpose;
      property_category: PropertyCategory;
      property_status: PropertyStatus;
      area_unit: AreaUnit;
      construction_status: ConstructionStatus;
      construction_type: ConstructionType;
      lead_source: LeadSource;
      lead_type: LeadType;
      lead_status: LeadStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}
