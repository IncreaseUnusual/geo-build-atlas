import { ConstructionFirm } from '../types/construction';

export const mockConstructionData: ConstructionFirm[] = [
  {
    id: '1',
    name: 'Manhattan Tower Complex',
    client: 'Apex Development Corp',
    coordinates: [-74.006, 40.7128],
    region: 'North America',
    soilLevel: 'rock',
    materials: ['steel', 'concrete', 'glass'],
    suppliers: ['SteelCorp Inc', 'Concrete Solutions', 'GlassTech'],
    projectType: 'commercial',
    startDate: '2024-01-15',
    estimatedCompletion: '2026-08-30',
    budget: 150000000,
    status: 'active',
    elevation: 15,
    surfaceArea: 5200
  },
  {
    id: '2',
    name: 'Thames Riverside Development',
    client: 'British Housing Authority',
    coordinates: [-0.1276, 51.5074],
    region: 'Europe',
    soilLevel: 'clay',
    materials: ['brick', 'steel', 'timber'],
    suppliers: ['London Brick Co', 'Euro Steel', 'Timber Works'],
    projectType: 'residential',
    startDate: '2023-09-01',
    estimatedCompletion: '2025-12-15',
    budget: 85000000,
    status: 'active',
    elevation: 8,
    surfaceArea: 12000
  },
  {
    id: '3',
    name: 'Tokyo Sky District',
    client: 'Nihon Construction Group',
    coordinates: [139.6917, 35.6895],
    region: 'Asia',
    soilLevel: 'mixed',
    materials: ['steel', 'concrete', 'carbon fiber'],
    suppliers: ['Tokyo Steel', 'Concrete Masters', 'Advanced Materials'],
    projectType: 'commercial',
    startDate: '2024-03-10',
    estimatedCompletion: '2027-01-20',
    budget: 220000000,
    status: 'planning',
    elevation: 12,
    surfaceArea: 8500
  },
  {
    id: '4',
    name: 'Sydney Harbor Bridge Extension',
    client: 'Australian Infrastructure Ltd',
    coordinates: [151.2093, -33.8688],
    region: 'Oceania',
    soilLevel: 'sand',
    materials: ['steel', 'concrete'],
    suppliers: ['Aussie Steel', 'Harbor Concrete'],
    projectType: 'infrastructure',
    startDate: '2023-11-20',
    estimatedCompletion: '2025-06-30',
    budget: 95000000,
    status: 'active',
    elevation: 5,
    surfaceArea: 3200
  },
  {
    id: '5',
    name: 'São Paulo Industrial Complex',
    client: 'Brazilian Manufacturing Corp',
    coordinates: [-46.6333, -23.5505],
    region: 'South America',
    soilLevel: 'loam',
    materials: ['steel', 'concrete', 'aluminum'],
    suppliers: ['Brasil Steel', 'Concrete Pro', 'MetalWorks'],
    projectType: 'industrial',
    startDate: '2024-02-01',
    estimatedCompletion: '2025-11-15',
    budget: 75000000,
    status: 'active',
    elevation: 760,
    surfaceArea: 15000
  },
  {
    id: '6',
    name: 'Dubai Solar Park',
    client: 'Emirates Energy Solutions',
    coordinates: [55.2708, 25.2048],
    region: 'Middle East',
    soilLevel: 'sand',
    materials: ['steel', 'glass', 'solar panels'],
    suppliers: ['Desert Steel', 'Solar Tech UAE', 'Glass Emirates'],
    projectType: 'infrastructure',
    startDate: '2023-08-15',
    estimatedCompletion: '2024-12-31',
    budget: 180000000,
    status: 'active',
    elevation: 300,
    surfaceArea: 25000
  },
  {
    id: '7',
    name: 'Lagos Business District',
    client: 'West African Development Bank',
    coordinates: [3.3792, 6.5244],
    region: 'Africa',
    soilLevel: 'clay',
    materials: ['concrete', 'steel', 'glass'],
    suppliers: ['Nigeria Concrete', 'African Steel', 'Lagos Glass'],
    projectType: 'commercial',
    startDate: '2024-01-01',
    estimatedCompletion: '2026-03-30',
    budget: 65000000,
    status: 'planning',
    elevation: 40,
    surfaceArea: 7800
  }
];

export const soilLevelColors = {
  clay: '#8B4513',
  sand: '#F4A460',
  rock: '#696969',
  loam: '#654321',
  mixed: '#A0522D'
};

export const statusColors = {
  planning: '#FFD700',
  active: '#00FF00',
  completed: '#0000FF',
  suspended: '#FF0000'
};