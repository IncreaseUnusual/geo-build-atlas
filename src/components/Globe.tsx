import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import { ConstructionFirm } from '../types/construction';
import earthTexture from '../assets/earth-texture.jpg';

interface GlobeProps {
  constructionData: ConstructionFirm[];
  highlightedFirms: string[];
  onFirmClick: (firm: ConstructionFirm) => void;
}

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, earthTexture);
  
  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Sphere ref={earthRef} args={[2, 64, 64]}>
      <meshStandardMaterial 
        map={texture} 
        roughness={0.8}
        metalness={0.1}
      />
    </Sphere>
  );
}

function ConstructionMarker({ 
  firm, 
  highlighted, 
  onClick 
}: { 
  firm: ConstructionFirm; 
  highlighted: boolean; 
  onClick: () => void;
}) {
  const markerRef = useRef<THREE.Mesh>(null);
  
  // Convert lat/lng to 3D coordinates
  const position = useMemo(() => {
    const lat = (firm.coordinates[1] * Math.PI) / 180;
    const lng = (firm.coordinates[0] * Math.PI) / 180;
    const radius = 2.05;
    
    const x = radius * Math.cos(lat) * Math.cos(lng);
    const y = radius * Math.sin(lat);
    const z = radius * Math.cos(lat) * Math.sin(lng);
    
    return [x, y, z] as [number, number, number];
  }, [firm.coordinates]);

  const getMarkerColor = () => {
    if (highlighted) return '#00ffff';
    
    switch (firm.status) {
      case 'active': return '#00ff00';
      case 'planning': return '#ffff00';
      case 'completed': return '#0066ff';
      case 'suspended': return '#ff0000';
      case 'delayed': return '#ff8800';
      default: return '#ff6600';
    }
  };

  const getEmissiveColor = () => {
    if (highlighted) return '#004444';
    
    switch (firm.status) {
      case 'active': return '#002200';
      case 'planning': return '#444400';
      case 'completed': return '#001144';
      case 'suspended': return '#440000';
      case 'delayed': return '#442200';
      default: return '#442200';
    }
  };

  useFrame((state) => {
    if (markerRef.current && highlighted) {
      markerRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 4) * 0.3);
    } else if (markerRef.current) {
      markerRef.current.scale.setScalar(1);
    }
  });

  return (
    <group position={position}>
      <mesh ref={markerRef} onClick={onClick}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial 
          color={getMarkerColor()} 
          emissive={getEmissiveColor()}
          emissiveIntensity={highlighted ? 0.5 : 0.3}
        />
      </mesh>
      {highlighted && (
        <Html distanceFactor={8}>
          <div className="bg-card/95 border border-cyber-primary rounded-lg px-3 py-2 text-xs text-cyber-primary min-w-[250px] backdrop-blur-sm">
            <div className="font-bold text-sm mb-1">{firm.name}</div>
            <div className="space-y-1 text-xs">
              <div><span className="text-cyber-secondary">Client:</span> {firm.client}</div>
              <div><span className="text-cyber-secondary">Location:</span> {firm.city}, {firm.country}</div>
              <div><span className="text-cyber-secondary">Type:</span> {firm.projectType}</div>
              <div><span className="text-cyber-secondary">Status:</span> <span className={`font-medium ${
                firm.status === 'active' ? 'text-green-400' :
                firm.status === 'planning' ? 'text-yellow-400' :
                firm.status === 'completed' ? 'text-blue-400' :
                firm.status === 'suspended' ? 'text-red-400' :
                'text-orange-400'
              }`}>{firm.status.toUpperCase()}</span></div>
              <div><span className="text-cyber-secondary">Budget:</span> ${(firm.budget / 1000000).toFixed(0)}M</div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

export default function Globe({ constructionData, highlightedFirms, onFirmClick }: GlobeProps) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#0099ff" />
        <pointLight position={[0, 0, 15]} intensity={0.6} color="#ffffff" />
        
        <Earth />
        
        {constructionData.map((firm) => (
          <ConstructionMarker
            key={firm.id}
            firm={firm}
            highlighted={highlightedFirms.includes(firm.id)}
            onClick={() => onFirmClick(firm)}
          />
        ))}
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={15}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}