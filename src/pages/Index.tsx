import React, { useState, useMemo } from 'react';
import Globe from '../components/Globe';
import SearchPanel from '../components/SearchPanel';
import InfoPanel from '../components/InfoPanel';
import { mockConstructionData } from '../data/mockData';
import { ConstructionFirm, SearchFilters } from '../types/construction';

const Index = () => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const [selectedFirm, setSelectedFirm] = useState<ConstructionFirm | null>(null);

  // Filter construction data based on search criteria
  const filteredData = useMemo(() => {
    return mockConstructionData.filter((firm) => {
      return Object.entries(searchFilters).every(([key, value]) => {
        const firmValue = firm[key as keyof ConstructionFirm];
        
        if (key === 'client') {
          return firm.client.toLowerCase().includes(value.toLowerCase());
        }
        
        if (key === 'material') {
          return firm.materials.some(material => 
            material.toLowerCase().includes(value.toLowerCase())
          );
        }
        
        if (key === 'supplier') {
          return firm.suppliers.some(supplier => 
            supplier.toLowerCase().includes(value.toLowerCase())
          );
        }
        
        return firmValue === value;
      });
    });
  }, [searchFilters]);

  // Get IDs of filtered firms for highlighting
  const highlightedFirmIds = useMemo(() => {
    return filteredData.map(firm => firm.id);
  }, [filteredData]);

  const handleFirmClick = (firm: ConstructionFirm) => {
    setSelectedFirm(firm);
  };

  const handleCloseInfo = () => {
    setSelectedFirm(null);
  };

  return (
    <div className="h-screen w-screen bg-gradient-dark cyber-grid overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-background/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded cyber-glow"></div>
            <div>
              <h1 className="text-xl font-bold text-cyber-primary">Geo-Build Atlas</h1>
              <p className="text-xs text-cyber-secondary">Global Construction Intelligence Platform</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-cyber-primary font-mono">
              {filteredData.length} / {mockConstructionData.length} sites visible
            </div>
            <div className="text-xs text-muted-foreground">
              {Object.keys(searchFilters).length} filters active
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-full pt-20">
        {/* Left Panel - Search Controls */}
        <div className="w-80 p-4 space-y-4 overflow-y-auto bg-gradient-to-b from-background/50 to-background/30 backdrop-blur-sm">
          <SearchPanel 
            onFiltersChange={setSearchFilters}
            activeFilters={searchFilters}
          />
        </div>

        {/* Center - Globe View */}
        <div className="flex-1 relative">
          <Globe 
            constructionData={mockConstructionData}
            highlightedFirms={highlightedFirmIds}
            onFirmClick={handleFirmClick}
          />
          
          {/* Globe Controls Overlay */}
          <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm border border-cyber-primary/30 rounded-lg p-3">
            <div className="text-xs text-cyber-secondary space-y-1">
              <div>🖱️ Click & drag to rotate</div>
              <div>🔍 Scroll to zoom</div>
              <div>📍 Click markers for details</div>
            </div>
          </div>

          {/* Legend */}
          <div className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm border border-cyber-primary/30 rounded-lg p-3 space-y-2">
            <h3 className="text-sm font-semibold text-cyber-primary">Legend</h3>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span>Construction Sites</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400 cyber-pulse"></div>
                <span>Filtered Results</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Info Display */}
        {selectedFirm && (
          <div className="w-96 p-4 bg-gradient-to-b from-background/50 to-background/30 backdrop-blur-sm">
            <InfoPanel 
              selectedFirm={selectedFirm}
              onClose={handleCloseInfo}
            />
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-background/80 to-transparent p-2">
        <div className="flex items-center justify-between text-xs text-cyber-secondary">
          <div className="flex items-center gap-4">
            <span>System Status: Online</span>
            <span>Data Sync: Real-time</span>
            <span>Last Update: {new Date().toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyber-success animate-pulse"></div>
            <span>Connected to Global Database</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
