export interface ConstructionFirm {
  id: string;
  name: string;
  client: string;
  coordinates: [number, number]; // [longitude, latitude]
  region: string;
  country: string;
  city: string;
  soilLevel: 'clay' | 'sand' | 'rock' | 'loam' | 'mixed' | 'limestone' | 'granite' | 'silt';
  materials: string[];
  suppliers: string[];
  projectType: 'residential' | 'commercial' | 'industrial' | 'infrastructure' | 'mixed-use' | 'healthcare' | 'education';
  startDate: string;
  estimatedCompletion: string;
  budget: number;
  actualCost?: number;
  status: 'planning' | 'active' | 'completed' | 'suspended' | 'delayed';
  elevation: number;
  surfaceArea: number; // in square meters
  floors: number;
  units?: number; // for residential projects
  contractor: string;
  architect: string;
  engineer: string;
  permits: string[];
  environmentalImpact: 'low' | 'medium' | 'high';
  sustainabilityRating?: string;
  weatherConditions: string[];
  accessRoads: boolean;
  utilities: string[];
  nearbyInfrastructure: string[];
  riskFactors: string[];
  milestones: {
    name: string;
    date: string;
    completed: boolean;
  }[];
  workforce: {
    total: number;
    skilled: number;
    unskilled: number;
    safety_incidents: number;
  };
  equipmentUsed: string[];
  transportationNeeds: string[];
}

export interface SearchFilters {
  client?: string;
  soilLevel?: string;
  region?: string;
  material?: string;
  supplier?: string;
  projectType?: string;
  status?: string;
  environmentalImpact?: string;
  contractor?: string;
  country?: string;
}

export interface GlobeMarker {
  id: string;
  position: [number, number, number]; // [x, y, z] in 3D space
  data: ConstructionFirm;
  highlighted: boolean;
}