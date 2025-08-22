export interface ConstructionFirm {
  id: string;
  name: string;
  client: string;
  coordinates: [number, number]; // [longitude, latitude]
  region: string;
  soilLevel: 'clay' | 'sand' | 'rock' | 'loam' | 'mixed';
  materials: string[];
  suppliers: string[];
  projectType: 'residential' | 'commercial' | 'industrial' | 'infrastructure';
  startDate: string;
  estimatedCompletion: string;
  budget: number;
  status: 'planning' | 'active' | 'completed' | 'suspended';
  elevation: number;
  surfaceArea: number; // in square meters
}

export interface SearchFilters {
  client?: string;
  soilLevel?: string;
  region?: string;
  material?: string;
  supplier?: string;
  projectType?: string;
  status?: string;
}

export interface GlobeMarker {
  id: string;
  position: [number, number, number]; // [x, y, z] in 3D space
  data: ConstructionFirm;
  highlighted: boolean;
}