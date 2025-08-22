import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, DollarSign, MapPin, Users, Truck, Package } from 'lucide-react';
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
      default: return 'bg-muted';
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

  return (
    <Card className="bg-card/90 backdrop-blur-sm border-cyber-primary/30 p-6 space-y-6 max-h-[80vh] overflow-y-auto">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-cyber-primary mb-2">{selectedFirm.name}</h2>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{selectedFirm.client}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-cyber-primary transition-colors"
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
          <span className="text-sm text-muted-foreground">
            {calculateProgress()}% Complete
          </span>
        </div>
        <Progress value={calculateProgress()} className="w-full" />
      </div>

      {/* Key Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyber-secondary" />
            <div>
              <div className="text-sm font-medium">Location</div>
              <div className="text-xs text-muted-foreground">
                {selectedFirm.coordinates[1].toFixed(4)}°N, {selectedFirm.coordinates[0].toFixed(4)}°E
              </div>
              <div className="text-xs text-muted-foreground">{selectedFirm.region}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyber-secondary" />
            <div>
              <div className="text-sm font-medium">Timeline</div>
              <div className="text-xs text-muted-foreground">
                Start: {new Date(selectedFirm.startDate).toLocaleDateString()}
              </div>
              <div className="text-xs text-muted-foreground">
                Est. Completion: {new Date(selectedFirm.estimatedCompletion).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-cyber-secondary" />
            <div>
              <div className="text-sm font-medium">Budget</div>
              <div className="text-lg font-bold text-cyber-primary">
                {formatCurrency(selectedFirm.budget)}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="text-sm font-medium mb-2">Soil Composition</div>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded ${getSoilColor(selectedFirm.soilLevel)}`}></div>
              <span className="text-sm capitalize">{selectedFirm.soilLevel}</span>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Project Type</div>
            <Badge variant="outline" className="border-cyber-accent text-cyber-accent">
              {selectedFirm.projectType}
            </Badge>
          </div>

          <div>
            <div className="text-sm font-medium mb-2">Site Details</div>
            <div className="text-xs text-muted-foreground">
              Elevation: {selectedFirm.elevation}m
            </div>
            <div className="text-xs text-muted-foreground">
              Surface Area: {selectedFirm.surfaceArea.toLocaleString()}m²
            </div>
          </div>
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
              className="bg-cyber-primary/10 text-cyber-primary border-cyber-primary/30"
            >
              {material}
            </Badge>
          ))}
        </div>
      </div>

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
    </Card>
  );
}