import React, { useState } from 'react';
import { Search, Filter, MapPin, Building2, Users, Hammer } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { SearchFilters } from '../types/construction';

interface SearchPanelProps {
  onFiltersChange: (filters: SearchFilters) => void;
  activeFilters: SearchFilters;
}

export default function SearchPanel({ onFiltersChange, activeFilters }: SearchPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleFilterChange = (key: keyof SearchFilters, value: string | undefined) => {
    const newFilters = { ...activeFilters };
    if (value && value !== 'all') {
      newFilters[key] = value;
    } else {
      delete newFilters[key];
    }
    onFiltersChange(newFilters);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Simple search - check if query matches client name
      handleFilterChange('client', searchQuery.trim());
      setSearchQuery('');
    }
  };

  const clearFilters = () => {
    onFiltersChange({});
    setSearchQuery('');
  };

  const activeFilterCount = Object.keys(activeFilters).length;

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-cyber-primary/30 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-cyber-primary" />
          <h2 className="text-lg font-semibold text-cyber-primary">Construction Atlas</h2>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-cyber-secondary" />
          <span className="text-sm text-muted-foreground">
            {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyber-secondary" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by client, material, supplier..."
          className="pl-10 bg-input/50 border-cyber-primary/30 focus:border-cyber-primary"
        />
      </form>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-cyber-secondary flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Region
          </label>
          <Select onValueChange={(value) => handleFilterChange('region', value)}>
            <SelectTrigger className="bg-input/50 border-cyber-primary/30">
              <SelectValue placeholder="All regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All regions</SelectItem>
              <SelectItem value="North America">North America</SelectItem>
              <SelectItem value="Europe">Europe</SelectItem>
              <SelectItem value="Asia">Asia</SelectItem>
              <SelectItem value="Oceania">Oceania</SelectItem>
              <SelectItem value="South America">South America</SelectItem>
              <SelectItem value="Africa">Africa</SelectItem>
              <SelectItem value="Middle East">Middle East</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-cyber-secondary">
            Soil Level
          </label>
          <Select onValueChange={(value) => handleFilterChange('soilLevel', value)}>
            <SelectTrigger className="bg-input/50 border-cyber-primary/30">
              <SelectValue placeholder="All soil types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All soil types</SelectItem>
              <SelectItem value="clay">Clay</SelectItem>
              <SelectItem value="sand">Sand</SelectItem>
              <SelectItem value="rock">Rock</SelectItem>
              <SelectItem value="loam">Loam</SelectItem>
              <SelectItem value="mixed">Mixed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-cyber-secondary flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Project Type
          </label>
          <Select onValueChange={(value) => handleFilterChange('projectType', value)}>
            <SelectTrigger className="bg-input/50 border-cyber-primary/30">
              <SelectValue placeholder="All project types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All project types</SelectItem>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
              <SelectItem value="infrastructure">Infrastructure</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-cyber-secondary flex items-center gap-2">
            <Hammer className="w-4 h-4" />
            Status
          </label>
          <Select onValueChange={(value) => handleFilterChange('status', value)}>
            <SelectTrigger className="bg-input/50 border-cyber-primary/30">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-cyber-secondary">Active Filters:</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="text-cyber-warning hover:text-cyber-warning/80"
            >
              Clear all
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([key, value]) => (
              <Badge 
                key={key} 
                variant="secondary"
                className="bg-cyber-primary/20 text-cyber-primary border-cyber-primary/30"
              >
                {key}: {value}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="pt-4 border-t border-cyber-primary/20">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-cyber-primary">247</div>
            <div className="text-xs text-muted-foreground">Total Projects</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-cyber-secondary">42</div>
            <div className="text-xs text-muted-foreground">Active Sites</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-cyber-accent">15</div>
            <div className="text-xs text-muted-foreground">Regions</div>
          </div>
        </div>
      </div>
    </Card>
  );
}