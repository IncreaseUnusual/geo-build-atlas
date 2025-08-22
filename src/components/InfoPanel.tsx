import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, DollarSign, MapPin, Users, Truck, Package, Building, Hammer, Shield, Leaf, AlertTriangle, Clock } from 'lucide-react';
import { ConstructionFirm } from '../types/construction';

interface InfoPanelProps {
  selectedFirm: ConstructionFirm | null;
  onClose: () => void;
}

export default function InfoPanel({ selectedFirm, onClose }: InfoPanelProps) {
  if (!selectedFirm) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'text-cyber-warning';
      case 'active': return 'text-cyber-success';
      case 'completed': return 'text-cyber-accent';
      case 'suspended': return 'text-destructive';
      case 'delayed': return 'text-orange-400';
      default: return 'text-muted-foreground';
    }
  };

  const getSoilColor = (soilLevel: string) => {
    switch (soilLevel) {
      case 'clay': return 'bg-amber-700';
      case 'sand': return 'bg-yellow-600';
      case 'rock': return 'bg-gray-600';
      case 'loam': return 'bg-amber-800';
      case 'mixed': return 'bg-gradient-to-r from-amber-700 to-gray-600';
      case 'limestone': return 'bg-stone-300';
      case 'granite': return 'bg-slate-600';
      case 'silt': return 'bg-yellow-700';
      default: return 'bg-muted';
    }
  };

  const getEnvironmentalColor = (impact: string) => {
    switch (impact) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-red-400';
      default: return 'text-muted-foreground';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = () => {
    const start = new Date(selectedFirm.startDate);
    const end = new Date(selectedFirm.estimatedCompletion);
    const now = new Date();
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    const total = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    return Math.round((elapsed / total) * 100);
  };

  const completedMilestones = selectedFirm.milestones.filter(m => m.completed).length;
  const totalMilestones = selectedFirm.milestones.length;

  return (
    <Card className="bg-card/90 backdrop-blur-sm border-cyber-primary/30 p-6 space-y-6 max-h-[85vh] overflow-y-auto">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-cyber-primary mb-2">{selectedFirm.name}</h2>
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Users className="w-4 h-4" />
            <span>{selectedFirm.client}</span>
          </div>
          <div className="flex items-center gap-2 text-cyber-secondary text-sm">
            <MapPin className="w-4 h-4" />
            <span>{selectedFirm.city}, {selectedFirm.country}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-cyber-primary transition-colors text-xl"
        >
          ✕
        </button>
      </div>

      {/* Status and Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge 
            variant="secondary"
            className={`${getStatusColor(selectedFirm.status)} bg-transparent border-current`}
          >
            {selectedFirm.status.toUpperCase()}
          </Badge>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">
              Progress: {calculateProgress()}%
            </div>
            <div className="text-xs text-muted-foreground">
              Milestones: {completedMilestones}/{totalMilestones}
            </div>
          </div>
        </div>
        <Progress value={calculateProgress()} className="w-full" />
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/20">
          <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
          <TabsTrigger value="details" className="text-xs">Details</TabsTrigger>
          <TabsTrigger value="team" className="text-xs">Team</TabsTrigger>
          <TabsTrigger value="logistics" className="text-xs">Logistics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-cyber-secondary" />
                <div>
                  <div className="text-sm font-medium">Budget</div>
                  <div className="text-lg font-bold text-cyber-primary">
                    {formatCurrency(selectedFirm.budget)}
                  </div>
                  {selectedFirm.actualCost && (
                    <div className="text-xs text-muted-foreground">
                      Actual: {formatCurrency(selectedFirm.actualCost)}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-cyber-secondary" />
                <div>
                  <div className="text-sm font-medium">Structure</div>
                  <div className="text-sm text-muted-foreground">
                    {selectedFirm.floors} floors • {selectedFirm.surfaceArea.toLocaleString()}m²
                  </div>
                  {selectedFirm.units && (
                    <div className="text-xs text-muted-foreground">
                      {selectedFirm.units} units
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyber-secondary" />
                <div>
                  <div className="text-sm font-medium">Timeline</div>
                  <div className="text-xs text-muted-foreground">
                    Start: {new Date(selectedFirm.startDate).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Est. End: {new Date(selectedFirm.estimatedCompletion).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-cyber-secondary" />
                <div>
                  <div className="text-sm font-medium">Environment</div>
                  <div className={`text-sm font-medium ${getEnvironmentalColor(selectedFirm.environmentalImpact)}`}>
                    {selectedFirm.environmentalImpact.toUpperCase()} Impact
                  </div>
                  {selectedFirm.sustainabilityRating && (
                    <div className="text-xs text-muted-foreground">
                      {selectedFirm.sustainabilityRating}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Soil and Location */}
          <div>
            <div className="text-sm font-medium mb-2">Site Information</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded ${getSoilColor(selectedFirm.soilLevel)}`}></div>
                <span>Soil: {selectedFirm.soilLevel}</span>
              </div>
              <div>Elevation: {selectedFirm.elevation}m</div>
              <div>Project Type: {selectedFirm.projectType}</div>
              <div>Access Roads: {selectedFirm.accessRoads ? 'Available' : 'Limited'}</div>
            </div>
          </div>

          {/* Materials */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-4 h-4 text-cyber-secondary" />
              <span className="text-sm font-medium">Materials</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedFirm.materials.map((material, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className="bg-cyber-primary/10 text-cyber-primary border-cyber-primary/30 text-xs"
                >
                  {material}
                </Badge>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-4 mt-4">
          {/* Permits */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-cyber-secondary" />
              <span className="text-sm font-medium">Permits & Approvals</span>
            </div>
            <div className="space-y-1">
              {selectedFirm.permits.map((permit, index) => (
                <div key={index} className="text-xs bg-muted/20 p-2 rounded">
                  {permit}
                </div>
              ))}
            </div>
          </div>

          {/* Weather Conditions */}
          <div>
            <div className="text-sm font-medium mb-2">Weather Conditions</div>
            <div className="flex flex-wrap gap-2">
              {selectedFirm.weatherConditions.map((condition, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {condition}
                </Badge>
              ))}
            </div>
          </div>

          {/* Risk Factors */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-cyber-warning" />
              <span className="text-sm font-medium">Risk Factors</span>
            </div>
            <div className="space-y-1">
              {selectedFirm.riskFactors.map((risk, index) => (
                <div key={index} className="text-xs text-cyber-warning bg-cyber-warning/10 p-2 rounded border border-cyber-warning/20">
                  {risk}
                </div>
              ))}
            </div>
          </div>

          {/* Utilities */}
          <div>
            <div className="text-sm font-medium mb-2">Utilities</div>
            <div className="grid grid-cols-2 gap-1 text-xs">
              {selectedFirm.utilities.map((utility, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyber-success"></div>
                  {utility}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-4 mt-4">
          {/* Key Personnel */}
          <div className="space-y-3">
            <div className="text-sm font-medium">Project Team</div>
            <div className="grid gap-2">
              <div className="flex justify-between items-center p-2 bg-muted/20 rounded">
                <span className="text-sm">Contractor</span>
                <span className="text-sm font-medium text-cyber-primary">{selectedFirm.contractor}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted/20 rounded">
                <span className="text-sm">Architect</span>
                <span className="text-sm font-medium text-cyber-secondary">{selectedFirm.architect}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted/20 rounded">
                <span className="text-sm">Engineer</span>
                <span className="text-sm font-medium text-cyber-accent">{selectedFirm.engineer}</span>
              </div>
            </div>
          </div>

          {/* Workforce */}
          <div>
            <div className="text-sm font-medium mb-3">Workforce ({selectedFirm.workforce.total} total)</div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Skilled Workers</span>
                <span className="text-sm font-medium">{selectedFirm.workforce.skilled}</span>
              </div>
              <Progress value={(selectedFirm.workforce.skilled / selectedFirm.workforce.total) * 100} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Unskilled Workers</span>
                <span className="text-sm font-medium">{selectedFirm.workforce.unskilled}</span>
              </div>
              <Progress value={(selectedFirm.workforce.unskilled / selectedFirm.workforce.total) * 100} className="h-2" />
              
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm">Safety Incidents</span>
                <span className={`text-sm font-medium ${selectedFirm.workforce.safety_incidents === 0 ? 'text-cyber-success' : 'text-cyber-warning'}`}>
                  {selectedFirm.workforce.safety_incidents}
                </span>
              </div>
            </div>
          </div>

          {/* Milestones */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-cyber-secondary" />
              <span className="text-sm font-medium">Project Milestones</span>
            </div>
            <div className="space-y-2">
              {selectedFirm.milestones.map((milestone, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${milestone.completed ? 'bg-cyber-success' : 'bg-muted'}`}></div>
                    <span className="text-sm">{milestone.name}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(milestone.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="logistics" className="space-y-4 mt-4">
          {/* Suppliers */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Truck className="w-4 h-4 text-cyber-secondary" />
              <span className="text-sm font-medium">Suppliers</span>
            </div>
            <div className="space-y-2">
              {selectedFirm.suppliers.map((supplier, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-2 rounded bg-muted/30"
                >
                  <span className="text-sm">{supplier}</span>
                  <Badge 
                    variant="outline" 
                    className="text-xs border-cyber-secondary text-cyber-secondary"
                  >
                    Active
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Hammer className="w-4 h-4 text-cyber-secondary" />
              <span className="text-sm font-medium">Equipment</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedFirm.equipmentUsed.map((equipment, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className="bg-cyber-accent/10 text-cyber-accent border-cyber-accent/30 text-xs"
                >
                  {equipment}
                </Badge>
              ))}
            </div>
          </div>

          {/* Transportation */}
          <div>
            <div className="text-sm font-medium mb-2">Transportation Needs</div>
            <div className="space-y-1">
              {selectedFirm.transportationNeeds.map((need, index) => (
                <div key={index} className="text-xs bg-muted/20 p-2 rounded">
                  • {need}
                </div>
              ))}
            </div>
          </div>

          {/* Infrastructure */}
          <div>
            <div className="text-sm font-medium mb-2">Nearby Infrastructure</div>
            <div className="grid grid-cols-1 gap-1">
              {selectedFirm.nearbyInfrastructure.map((infra, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 rounded-full bg-cyber-primary"></div>
                  {infra}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}